import React from 'react';
import HRSidebar from '../components/hr/HRSidebar';

const HrLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <HRSidebar />

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default HrLayout;
