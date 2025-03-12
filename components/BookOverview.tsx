import React from "react";
import Image from "next/image";
import BookCover from "@/components/BookCover";
import BorrowBook from "@/components/BorrowBook";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import ReturnBook from "./ReturnBook";
// import { ToastClient } from "./handleToast";
import { format } from "date-fns";

interface Props extends Book {
  userId: string;
}
const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const existingRecord = await db
    .select()
    .from(borrowRecords)
    .where(and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, id),
              eq(borrowRecords.status, "BORROWED")
  ))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>

          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books <span>{totalCopies}</span>
          </p>

          <p>
            Available Books <span>{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        {!existingRecord[0] && user && (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
            // existingRecord = {existingRecord}
          />
        )}

        {existingRecord[0] && (
          <>
            {existingRecord[0] && (
              <div className="flex flex-col gap-4 p-4 border-2 border-gray-300 rounded-xl bg-slate-800 shadow-md">
                <ReturnBook
                  userId={userId}
                  bookId={id}
                  recordId={existingRecord[0].id}
                />

                <div className="flex justify-between items-center gap-4">
                  <p className="text-lg font-medium text-gray-200">
                    📖 Borrow Date:
                    <time
                      dateTime={existingRecord[0].borrowDate.toISOString()}
                      suppressHydrationWarning
                    >
                      {existingRecord[0]?.borrowDate?.toLocaleDateString("en-CA")}
                    </time>
                  </p>

                  <p className="text-lg font-medium text-gray-200">
                    📅 Due Date:
                    <time
                      dateTime={existingRecord[0]?.dueDate}
                      // suppressHydrationWarning
                    >
                      {existingRecord[0]?.dueDate}
                    </time>
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
