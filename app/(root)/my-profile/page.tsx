import React from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { and, eq, inArray } from "drizzle-orm";
import { Smile } from "lucide-react";
import { parseISO, differenceInDays, differenceInHours } from "date-fns";
import { ToastClient } from "@/components/handleToast";

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const borrowedBooksRecord = await db
    .select()
    .from(borrowRecords)
    .where(
      and(
        eq(borrowRecords.userId, userId),
        eq(borrowRecords.status, "BORROWED")
      )
    );

  const bookIds = borrowedBooksRecord.map((record) => record.bookId);

  const borrowedBooks = await db
    .select()
    .from(books)
    .where(inArray(books.id, bookIds));

  function calculateTotalFine(
    borrowedBooksRecord: { dueDate: string }[],
    fineRate = 2
  ): number {
    const currentDate = new Date();
    let totalFine = 0;

    borrowedBooksRecord.forEach((book) => {
      if (book.dueDate) {
        const dueDate = parseISO(book.dueDate);
        const daysOverdue = differenceInDays(currentDate, dueDate);

        if (daysOverdue > 0) {
          totalFine += daysOverdue * fineRate;
        }
      }
    });

    return totalFine;
  }


  const fineAmount = calculateTotalFine(borrowedBooksRecord, 2);

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 flex items-center justify-center">
          <Smile className="w-6 h-6 mr-2" /> Welcome to Your Library Profile!
        </h1>

        <div className="flex justify-between">
          {/* Left side - Borrowed books */}
          <div className="max-w-4xl">
            <BookList title="Borrowed Books" books={borrowedBooks} />
          </div>

          {/* Rightmost side - Fine details */}
          <div className="ml-8 w-96">
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-red-600">
                📅 Fine Details
              </h2>
              {fineAmount > 0 ? (
                <>
                  <p className="text-lg mb-4">
                    Total Fine Amount:{" "}
                    <span className="font-bold text-red-500">
                      ${fineAmount.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Please return overdue books to avoid additional charges.
                  </p>
                </>
              ) : (
                <p className="text-green-600">
                  No fines! You're all caught up. ✅
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
