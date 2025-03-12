"use server";

import { books, borrowRecords, borrowRequests } from "@/database/schema";
import { db } from "@/database/drizzle";
import { bookSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export const deleteBookById = async (id: string) => {
  try {
    // Delete borrow requests related to the book
    await db.delete(borrowRequests).where(eq(borrowRequests.bookId, id));

    // Delete borrow records related to the book
    await db.delete(borrowRecords).where(eq(borrowRecords.bookId, id));

    // Then delete the book itself
    await db.delete(books).where(eq(books.id, id));

    return {
      success: true,
      message: "Book, related borrow records, and borrow requests deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting book and related records:", error);

    return {
      success: false,
      message: "An error occurred while deleting the book and its related records",
    };
  }
};



export const getAllBooks = async () => {
  try {
    const allBooks = await db.select().from(books);

    if (allBooks.length === 0) {
      return {
        success: false,
        message: "No books found",
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allBooks)),
    };
  } catch (error) {
    console.error("Error fetching books:", error);

    return {
      success: false,
      message: "An error occurred while fetching the books",
    };
  }
};


// export const getBookById = async (id: string) => {
//   try {
//     // Fetch the book with all necessary fields for editing
//     const book = await db
//       .select({
//         id: books.id,
//         title: books.title,
//         author: books.author,
//         genre: books.genre,
//         rating: books.rating,
//         totalCopies: books.totalCopies,
//         availableCopies: books.availableCopies,
//         coverUrl: books.coverUrl,
//         coverColor: books.coverColor,
//         description: books.description,
//         videoUrl: books.videoUrl,
//         summary: books.summary,
//         createdAt: books.createdAt,
//         // updatedAt: books.updatedAt,
//       })
//       .from(books)
//       .where(eq(books.id, id))
//       .limit(1);

//     if (book.length === 0) {
//       return {
//         success: false,
//         message: "Book not found",
//       };
//     }

//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(book[0])),
//     };
//   } catch (error) {
//     console.error("Error fetching book by ID:", error);

//     return {
//       success: false,
//       message: "An error occurred while fetching the book",
//     };
//   }
// };