"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { describeSignUpError } from "@/lib/db-errors";

const getClientIp = async () => {
  const h = await headers();
  // x-forwarded-for is "client, proxy1, proxy2" — the client is first
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "127.0.0.1";
};

// Fail closed: if Redis is unreachable, block rather than wave through.
const isRateLimited = async () => {
  const ip = await getClientIp();
  const { success } = await ratelimit.limit(ip);
  return !success;
};

// Internal: no rate limit, so signUp doesn't spend a second token
const authenticate = async (email: string, password: string) => {
  try {
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) return { success: false, error: "Invalid email or password" };
    return { success: true };
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { success: false, error: "Invalid email or password" };
  }
};

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const ip = await getClientIp();
  const { success } = await ratelimit.limit(ip);
  if (!success) return { success: false, error: "TOO_FAST" };

  const result = await authenticate(params.email, params.password);

  // Only failed attempts should count toward the limit — correct credentials
  // shouldn't be able to lock a legitimate user out.
  if (result.success) await ratelimit.resetUsedTokens(ip);

  return result;
};

export const signUp = async (params: AuthCredentials) => {
  if (await isRateLimited()) return { success: false, error: "TOO_FAST" };

  const { fullName, email, universityId, password, universityCard } = params;

  // Friendly pre-checks. The database constraints below are the real
  // guarantee — these just produce better messages in the common case.
  const [existingEmail] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingEmail) {
    return {
      success: false,
      error: "An account with this email already exists. Try signing in instead.",
    };
  }

  const [existingUniversityId] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.universityId, universityId))
    .limit(1);

  if (existingUniversityId) {
    return {
      success: false,
      error:
        "This university ID is already registered. Check the number, or contact the library if you think this is a mistake.",
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    await authenticate(email, password); // internal — no second token spent
    return { success: true };
  } catch (error) {
    // Pre-checks can lose a race between two concurrent signups; the unique
    // constraints are what actually enforce this, so translate their errors.
    console.error("Signup failed:", error);
    return { success: false, error: describeSignUpError(error) };
  }
};