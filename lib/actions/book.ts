"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, borrowRequests, users } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import dayjs from "dayjs";
import { ilike, or } from "drizzle-orm";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const request = await db
      .insert(borrowRequests)
      .values({
        userId,
        bookId,
        status: "PENDING",
        dueDate: dayjs().add(7, "day").toDate(), // Add 7 days to current date
      })
      .returning();


    return {
      success: true,
      message: "Borrow request submitted. Awaiting admin approval.",
      data: JSON.parse(JSON.stringify(request)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while submitting the borrow request",
    };
  }
};

export const approveBorrowRequest = async (requestId: string) => {
  try {
    const request = await db
      .select()
      .from(borrowRequests)
      .where(
        and(
          eq(borrowRequests.id, requestId),
          eq(borrowRequests.status, "PENDING")
        )
      )
      .limit(1);


    const borrowRequest = request[0] as typeof borrowRequests.$inferSelect;

    if (!borrowRequest || borrowRequest.status !== "PENDING") {
      return {
        success: false,
        error: "Invalid or already processed request",
      };
    }

    const { userId, bookId } = borrowRequest;

    const borrowDate = dayjs();
    const dueDate = borrowDate.add(7, "day").format("YYYY-MM-DD");

    // const returnDate = dueDate;

    const currentBook = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!currentBook.length || currentBook[0].availableCopies <= 0) {
      return {
        success: false,
        error: "No available copies of the book",
      };
    }

    await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      // returnDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: currentBook[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    await db
      .update(borrowRequests)
      .set({ status: "APPROVED" })
      .where(eq(borrowRequests.id, requestId));

    return {
      success: true,
      message: "Borrow request approved and book borrowed.",
    };
  } catch (error) {
    console.error("Error approving borrow request:", error);
    return {
      success: false,
      error: "An error occurred while approving the borrow request",
    };
  }
};

// Let me know if you want to tweak this logic further! 🚀

export async function checkBookRequest(userId: string, bookId: string): Promise<boolean> {
  try {
    const bookRequestSent = await db
      .select()
      .from(borrowRequests)
      .where(
        and(
          eq(borrowRequests.status, "PENDING"),
          eq(borrowRequests.bookId, bookId),
          eq(borrowRequests.userId, userId)
        )
      )
      .limit(1);

    return bookRequestSent.length > 0;
  } catch (error) {
    console.error("Error checking book request:", error);
    return false;
  }
}

export async function rejectBorrowRequest(requestId: string) {
  try {
    await db.update(borrowRequests).set({ status: "REJECTED" }).where(eq(borrowRequests.id, requestId));
    return { success: true, message: "Request rejected successfully" };
  } catch (error) {
    console.error("Error rejecting request:", error);
    return { success: false, error: "Failed to reject request" };
  }
}




export const returnBook = async (params: ReturnBookParams) => {
  const { userId, bookId, recordId } = params;

  try {
    // Fetch the book and borrow record
    const book = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    const borrowRecord = await db
      .select()
      .from(borrowRecords)
      .where(and(eq(borrowRecords.id, recordId), eq(borrowRecords.userId, userId)))
      .limit(1);

    // Check if both book and borrow record exist
    if (!book.length || !borrowRecord.length) {
      return {
        success: false,
        error: "Invalid book or borrow record. Book might already be returned or not borrowed by this user.",
      };
    }

    // Format the return date to match your schema
    const formattedReturnDate = dayjs().format("YYYY-MM-DD");

    // Update borrow record to 'RETURNED' with return date
    await db
      .update(borrowRecords)
      .set({ status: "RETURNED", returnDate: formattedReturnDate })
      .where(eq(borrowRecords.id, recordId));

    // Increment available copies
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies + 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      message: "Book returned successfully",
    };
  } catch (error) {
    console.log("Error returning book:", error);

    return {
      success: false,
      error: "An error occurred while returning the book",
    };
  }
};


export async function searchBooks(query: string) {
  try {
    if (!query) {
      return { data: [] };
    }

    const booksFound = await db
      .select()
      .from(books)
      .where(
        or(
          ilike(books.title, `%${query}%`),   // Search by title
          ilike(books.author, `%${query}%`)  // Search by author
        )
      )
      .limit(10); // Limit results to avoid overwhelming response

    return {
      // success: true,
      data: booksFound.length > 0 ? booksFound : [],
      // message: booksFound.length > 0 ? "Books found." : "No books found.",
    };
  } catch (error) {
    console.error("Error searching books:", error);
    return { data: [] };
  }
}


// Approve User
export const approveUser = async (userId) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!user.length) {
      return { success: false, error: "User not found" };
    }

    await db.update(users).set({ status: "APPROVED" }).where(eq(users.id, userId));

    return { success: true, message: "User approved successfully" };
  } catch (error) {
    console.log("Error approving user:", error);
    return { success: false, error: "Failed to approve user" };
  }
};

// Change User Role
export const changeUserRole = async (userId, newRole) => {
  try {

    await db.update(users).set({ role: newRole }).where(eq(users.id, userId));

    return { success: true, message: `User role changed to ${newRole}` };
  } catch (error) {
    console.log("Error changing user role:", error);
    return { success: false, error: "Failed to change user role" };
  }
};

// Delete User
export const deleteUser = async (userId) => {
  try {
    await db.delete(users).where(eq(users.id, userId));

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.log("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
};

// Fetch All Users
export const fetchUsers = async () => {
  try {
    const allUsers = await db.select().from(users).orderBy(users.createdAt);

    return { success: true, data: allUsers };
  } catch (error) {
    console.log("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
};