import React, { useState } from "react";

const AdminDesign = () => {
  const [loading] = useState(false);

  // Dummy Data for UI Preview Only
  const dummyStats = {
    totalUsers: 42,
    totalMessages: 180,
  };

  const dummyUsers = [
    { id: 1, full_name: "John Doe", email: "john@example.com", role: "admin", created_at: "2024-01-12" },
    { id: 2, full_name: "Sarah Parker", email: "sarah@example.com", role: "user", created_at: "2024-02-02" },
    { id: 3, full_name: "Mike Ross", email: "mike@example.com", role: "moderator", created_at: "2024-02-15" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Manage users and monitor activity</p>
          </div>

          <button className="border px-4 py-2 rounded-md hover:bg-gray-200">
            ← Back to Chat
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between mb-2">
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <p className="text-2xl font-bold">{dummyStats.totalUsers}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between mb-2">
              <p className="text-sm text-gray-600">Total Messages</p>
            </div>
            <p className="text-2xl font-bold">{dummyStats.totalMessages}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-gray-500 mb-4">View all registered users and their roles</p>

          {loading ? (
            <div className="text-center py-6 text-gray-500">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Email</th>
                    <th className="p-3 border">Role</th>
                    <th className="p-3 border">Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {dummyUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-3 border">{user.full_name}</td>
                      <td className="p-3 border">{user.email}</td>
                      <td className="p-3 border capitalize">{user.role}</td>
                      <td className="p-3 border">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDesign;
