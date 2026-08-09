/**
 * Maps Postgres error codes to messages a user can act on.
 * 23505 = unique_violation, 23503 = foreign_key_violation
 */

type PgError = { code?: string; constraint?: string; detail?: string; message?: string };

const asPgError = (error: unknown): PgError => (error ?? {}) as PgError;

const mentions = (error: PgError, needle: string) =>
  [error.constraint, error.detail, error.message]
    .filter(Boolean)
    .some((field) => field!.toLowerCase().includes(needle));

export const isUniqueViolation = (error: unknown) => asPgError(error).code === "23505";
export const isForeignKeyViolation = (error: unknown) => asPgError(error).code === "23503";

export const describeSignUpError = (error: unknown): string => {
  const pg = asPgError(error);

  if (isUniqueViolation(error)) {
    if (mentions(pg, "university_id")) {
      return "This university ID is already registered. Check the number, or contact the library if you think this is a mistake.";
    }
    if (mentions(pg, "email")) {
      return "An account with this email already exists. Try signing in instead.";
    }
    return "An account with these details already exists.";
  }

  return "We couldn't create your account. Please try again in a moment.";
};