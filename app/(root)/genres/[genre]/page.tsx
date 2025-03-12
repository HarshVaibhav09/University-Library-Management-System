import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { auth } from "@/auth";

const GenrePage = async ({ params }: { params: { genre: string } }) => {
  // Convert genre back to readable format
  const { genre } = params;
    const session = await auth();

    const normalizedGenre = genre
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Fetch books by genre
  const booksByGenre = await db.select().from(books).where(eq(books.genre, normalizedGenre));


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        Books in {normalizedGenre}
      </h1>
      {booksByGenre.length > 0 ? (
        <>
          <BookOverview
            {...booksByGenre[0]}
            userId={session?.user?.id as string}
          />

          <BookList
            title="More Books"
            books={booksByGenre.slice(1)}
            containerClassName="mt-28"
          />
        </>
      ) : (
        <p className="text-center text-gray-500">
          No books found in this genre.
        </p>
      )}
    </div>
  );
};

export default GenrePage;
