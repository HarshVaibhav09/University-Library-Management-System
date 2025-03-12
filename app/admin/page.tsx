import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Smile, BookOpen, User, Calendar, PlusCircle } from "lucide-react";
import { signOut } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";

const AdminDashboard = async() => {

  const allUsers = await db.select().from(users).orderBy(users.createdAt);
  const allBooks = await db.select().from(books).orderBy(books.title);
  const totalBooksBorrowed = await db.select().from(borrowRecords).where(eq(borrowRecords.status, "BORROWED")).orderBy(borrowRecords.createdAt);


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 flex items-center justify-center">
        <Smile className="w-6 h-6 mr-2" /> Welcome, Library Admin!
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <BookOpen className="w-10 h-10 text-blue-500 mb-3" />
          <h2 className="text-xl font-semibold">Total Books</h2>
          <p className="text-3xl font-bold">{allBooks.length}</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <User className="w-10 h-10 text-green-500 mb-3" />
          <h2 className="text-xl font-semibold">Registered Users</h2>
          <p className="text-3xl font-bold">{allUsers.length}</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <Calendar className="w-10 h-10 text-red-500 mb-3" />
          <h2 className="text-xl font-semibold">Books Borrowed</h2>
          <p className="text-3xl font-bold">{totalBooksBorrowed.length}</p>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/books/new">
          <div className="bg-blue-500 text-white rounded-2xl p-6 hover:bg-blue-600 cursor-pointer">
            <PlusCircle className="w-10 h-10 mb-3" />
            <h3 className="text-xl font-bold">Add New Book</h3>
          </div>
        </Link>

        <Link href="/admin/manage-users">
          <div className="bg-green-500 text-white rounded-2xl p-6 hover:bg-green-600 cursor-pointer">
            <User className="w-10 h-10 mb-3" />
            <h3 className="text-xl font-bold">Manage Users</h3>
          </div>
        </Link>

        <Link href="/admin/borrow-logs">
          <div className="bg-yellow-500 text-white rounded-2xl p-6 hover:bg-yellow-600 cursor-pointer">
            <Calendar className="w-10 h-10 mb-3" />
            <h3 className="text-xl font-bold">View Borrow Logs</h3>
          </div>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="mt-12 flex justify-center">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant="destructive">Logout</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;

// Let me know if you’d like me to add features like notifications, due book alerts, or recent activity logs! 📚✨
