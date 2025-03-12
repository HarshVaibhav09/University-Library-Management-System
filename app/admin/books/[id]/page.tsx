import React from 'react';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { eq } from 'drizzle-orm';
import { IKImage } from 'imagekitio-next';
import BookCover from '@/components/BookCover';
import BookVideo from '@/components/BookVideo';

const BookDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch the book by ID
  const book = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .then((res) => res[0]);

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div
          className="h-64"
          style={{ backgroundColor: book.coverColor }}
        >
          <BookCover
            //   variant="wide"
              coverColor={book.coverColor}
              coverImage={book.coverUrl}
            />
        </div>
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {book.title}
          </h1>
          <h2 className="text-2xl text-gray-600 mb-2">by {book.author}</h2>
          <p className="text-gray-500 mb-6">{book.genre}</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {book.description}
          </p>
          <div className="flex items-center justify-between mb-6">
            <span
              className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${
                book.availableCopies > 0 ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {book.availableCopies > 0
                ? `${book.availableCopies} Copies Available`
                : 'Out of Stock'}
            </span>
            <span className="text-yellow-500 font-bold text-lg">
              ⭐ {book.rating}/5
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Added on {format(new Date(book.createdAt), 'PPP')}
          </p>
          <div className="mt-6">
            <BookVideo videoUrl ={book.videoUrl}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
