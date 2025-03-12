"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { approveUser, changeUserRole, deleteUser, fetchUsers } from "@/lib/actions/book";
import dayjs from "dayjs";

const formatDate = (dateString: string) => {
    return dayjs(dateString).isValid()
      ? dayjs(dateString).format("MMMM D, YYYY")
      : "Not Returned";
};

const ManageUsersPage = ({ users }) => {
  const [userList, setUserList] = useState(users);
  const [loading, setLoading] = useState(null);

  const handleApprove = async (userId) => {
    setLoading(userId);
    const result = await approveUser(userId);
    if (result.success) {
      toast({ title: "User Approved", description: result.message });
      setUserList((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isApproved: true } : user
        )
      );
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
    setLoading(null);
  };

  const handleChangeRole = async (userId, currentRole) => {
    setLoading(userId);
    const newRole = currentRole === "USER" ? "ADMIN" : "USER";
    const result = await changeUserRole(userId, newRole);
    if (result.success) {
      toast({ title: "Role Updated", description: result.message });
      setUserList((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
    setLoading(null);
  };

  const handleDelete = async (userId) => {
    setLoading(userId);
    const result = await deleteUser(userId);
    if (result.success) {
      toast({ title: "User Deleted", description: result.message });
      setUserList((prev) => prev.filter((user) => user.id !== userId));
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
    setLoading(null);
  };

  return (
    <section className="w-full p-7 bg-gradient-to-r from-blue-500 to-cyan-500 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-6">Manage Users</h2>
      {userList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-2xl shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Join Date</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Approval</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {userList.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 transition-all">
                  <td className="p-4 border-b border-gray-200">{user.fullName}</td>
                  <td className="p-4 border-b border-gray-200">{user.email}</td>
                  <td className="p-4 border-b border-gray-200">{formatDate(user.createdAt)}</td>
                  <td className="p-4 border-b border-gray-200">{user.role}</td>
                  <td className="p-4 border-b border-gray-200">
                    {user.status === "APPROVED" ? (
                      <span className="text-green-500 font-medium">APPROVED</span>
                    ) : (
                      <span className="text-yellow-500 font-medium">PENDING</span>
                    )}
                  </td>
                  <td className="p-4 mt-4 border-b border-gray-200 flex gap-4 items-center">
                    {!user.isApproved && (
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleApprove(user.id)}
                        disabled={loading === user.id}
                      >
                        {loading === user.id ? "Approving..." : "Approve"}
                      </Button>
                    )}
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={() => handleChangeRole(user.id, user.role)}
                      disabled={loading === user.id}
                    >
                      {loading === user.id ? "Updating..." : "Change Role"}
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => handleDelete(user.id)}
                      disabled={loading === user.id}
                    >
                      {loading === user.id ? "Deleting..." : "Delete"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-white mt-6">
          <h3 className="text-2xl font-semibold mb-2">No Users Found</h3>
          <p className="text-lg">Looks like there are no users yet. 🚀</p>
        </div>
      )}
    </section>
  );
};

export default ManageUsersPage;

// Let me know if you want me to tweak anything! 🚀
