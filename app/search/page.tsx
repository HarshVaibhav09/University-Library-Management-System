import { auth } from "@/auth";

import { searchBooks } from "@/lib/actions/book";
import Page from "../(root)/books/[id]/page";
import BookList from "@/components/BookList";

export default async function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const session = await auth();
  const userId = session?.user?.id;

  const query = searchParams?.query || "";

  // Fetch books from the database or API
  const result = query ? await searchBooks(query) : [];
  const books = result.data as Book[];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Showing Results for: <span className="text-blue-500">{query}</span>
      </h1>

      {query && books.length > 0 ? (
        <div className="grid grid-cols-1 gap-10">

            <div>
                <BookList title="" books={books}/>
            </div>

        </div>
      ) : (
        <p className="text-gray-500">No books found. Try another title or author!</p>
      )}
    </div>
  );
}
