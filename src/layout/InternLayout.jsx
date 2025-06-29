import React from 'react';
import InternSidebar from '../components/intern/InternSidebar';

const InternLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <InternSidebar />

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default InternLayout;
