import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

import DeleteBookButton from "@/components/admin/DeleteBookButton";

const Page = async () => {
  const allBooks = await db.select().from(books);

  return (
    <section className="w-full p-7 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h2 className="text-3xl font-bold text-white">All Books</h2>
        <Button className="bg-yellow-400 hover:bg-yellow-300 text-sm py-2 px-3" asChild>
          <Link href="/admin/books/new" className="text-black font-semibold">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white p-5 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {book.title}
            </h3>
            <p className="text-gray-600 mb-2">Author: {book.author}</p>
            <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
            <p className="text-gray-600 mb-2">Rating: {book.rating}/5</p>
            <p className="text-gray-600 mb-4">Copies Available: {book.availableCopies}</p>
            <div className="flex space-x-2">
              <Link
                href={`/admin/books/${book.id}`}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm py-2 px-3 rounded-lg"
              >
                View Details
              </Link>

              <DeleteBookButton id={book.id}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;

// Let me know if you want me to add sorting, filtering, or more features! 🚀
