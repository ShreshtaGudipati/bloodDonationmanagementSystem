
import React from 'react';

const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p>User management interface will be implemented here.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Blood Inventory</h2>
          <p>Blood inventory management will be implemented here.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Donation Records</h2>
          <p>Donation records management will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
