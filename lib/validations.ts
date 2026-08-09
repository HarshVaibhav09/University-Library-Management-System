import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Please enter your full name (at least 3 characters)"),
  email: z.string().email("Please enter a valid email address"),
  universityId: z.coerce
    .number({ invalid_type_error: "University ID must be a number" })
    .int("University ID must be a whole number")
    .positive("University ID must be greater than 0"),
  universityCard: z.string().nonempty("Please upload your university ID card"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2, "Title is too short").max(100, "Title is too long"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(1000),
  author: z.string().trim().min(2, "Author name is too short").max(100),
  genre: z.string().trim().min(2, "Genre is too short").max(50),
  rating: z.coerce.number().min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5"),
  totalCopies: z.coerce.number().int("Must be a whole number").positive("Must be at least 1").lte(10000),
  coverUrl: z.string().nonempty("Please upload a book cover"),
  videoUrl: z.string().nonempty("Please upload a book video"),
  coverColor: z.string().trim().regex(/^#[0-9A-F]{6}$/i, "Pick a colour from the picker"),
  summary: z.string().trim().min(10, "Summary must be at least 10 characters"),
});