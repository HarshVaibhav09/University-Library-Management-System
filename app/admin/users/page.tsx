import React from "react";
import { db } from "@/database/drizzle";
import { users, borrowRecords } from "@/database/schema";
import { Smile } from "lucide-react";
import { format } from "date-fns";

const AdminUserListPage = async () => {
  const allUsers = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
      status: users.status,
      universityId: users.universityId
    })
    .from(users);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 flex items-center justify-center">
        <Smile className="w-6 h-6 mr-2" /> Library User Management
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="py-4 px-6 uppercase tracking-wider">ID</th>
              <th className="py-4 px-6 uppercase tracking-wider">Name</th>
              <th className="py-4 px-6 uppercase tracking-wider">Email</th>
              <th className="py-4 px-6 uppercase tracking-wider">Role</th>
              <th className="py-4 px-6 uppercase tracking-wider">Join Date</th>
              <th className="py-4 px-6 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition-all">
                <td className="py-4 px-6 text-gray-700 font-medium">{user.id}</td>
                <td className="py-4 px-6 text-gray-900">{user.fullName}</td>
                <td className="py-4 px-6 text-gray-600">{user.email}</td>
                <td className="py-4 px-6 text-indigo-500 font-semibold">{user.role}</td>
                <td className="py-4 px-6 text-gray-700">{format(user.createdAt, "PPP")}</td>
                <td
                  className={`py-4 px-6 font-semibold rounded-lg ${
                    user.status === "APPROVED"
                      ? "text-green-600 bg-green-100"
                      : "text-red-500 bg-red-100"
                  }`}
                >
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserListPage;

