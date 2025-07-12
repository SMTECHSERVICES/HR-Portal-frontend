// import React from 'react';
// import HRSidebar from '../components/hr/HRSidebar';

// const HrLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex">
//       {/* Sidebar */}
//       <HRSidebar />

//       {/* Main content */}
//       <main className="flex-1 p-6 bg-gray-50 overflow-auto">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default HrLayout;


import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import HRSidebar from '../components/hr/HRSidebar';

const HrLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row">
      {/* Hamburger for mobile */}
      <div className="md:hidden bg-white shadow px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-blue-800">HR Dashboard</h1>
        <button onClick={toggleSidebar}>
          <FaBars className="text-2xl text-blue-800" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 md:z-auto top-0 left-0 h-full bg-white shadow-md transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:flex`}
      >
        <HRSidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-50 overflow-auto mt-0 md:mt-0">
        {children}
      </main>
    </div>
  );
};

export default HrLayout;

