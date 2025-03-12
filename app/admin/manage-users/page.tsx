import ManageUsersPage from '@/components/admin/ManageUsers';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import React from 'react';

const page = async () => {
    const allUsers = await db.select().from(users).orderBy(users.createdAt);

    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          <ManageUsersPage users={allUsers} />
        </div>
      </main>
    );
};

export default page;
