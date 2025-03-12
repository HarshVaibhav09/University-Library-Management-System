// "use client";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import React from "react";
import dayjs from "dayjs";

// interface BorrowRecord {
//   recordId: string;
//   bookId: string;
//   userId: string;
//   borrowDate: Date;
//   dueDate: Date;
//   status: string;
// }

// interface Props {
//   borrowRecords: BorrowRecord[];
// }

const formatDate = (dateString: string) => {
    return dayjs(dateString).isValid()
      ? dayjs(dateString).format("MMMM D, YYYY")
      : "Not Returned";
  };

const BorrowRecordsPage = async() => {

    const AllBorrowRecords = await db
    .select({
      recordId: borrowRecords.id,
      bookTitle: books.title,
      userName: users.fullName,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate, // Fetch the due date
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .orderBy(desc(borrowRecords.borrowDate));

  return (
    <section className="w-full p-7 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-6">Borrow Records</h2>
      
      {AllBorrowRecords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-2xl shadow-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">Book Title</th>
                <th className="p-4 text-left">Borrowed By</th>
                <th className="p-4 text-left">Borrow Date</th>
                <th className="p-4 text-left">Due Date</th>
                <th className="p-4 text-left">Return Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {AllBorrowRecords.map((record:any) => (
                <tr
                  key={record.recordId}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="p-4 border-b border-gray-200">{record.bookTitle}</td>
                  <td className="p-4 border-b border-gray-200">{record.userName}</td>
                  <td className="p-4 border-b border-gray-200">
                  {formatDate(record.borrowDate)}
                  </td>
                  <td className="p-4 border-b border-gray-200">
                  {formatDate(record.dueDate)}
                  </td>
                  <td className="p-4 border-b border-gray-200">
                  {formatDate(record.returnDate)}
                  </td>
                  <td
                    className={`p-4 border-b border-gray-200 font-medium ${
                      record.status === "RETURNED"
                        ? "text-green-500"
                        : record.status === "BORROWED"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-white mt-6">
          <h3 className="text-2xl font-semibold mb-2">No Borrow Records Found</h3>
          <p className="text-lg">Looks like no books have been borrowed yet. 📚</p>
        </div>
      )}
    </section>
  );
};

export default BorrowRecordsPage;
