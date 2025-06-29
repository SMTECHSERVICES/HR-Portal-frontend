// import React from 'react';
// import InternSidebar from '../components/intern/InternSidebar';

// const InternLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex">
//       {/* Sidebar */}
//       <InternSidebar />

//       {/* Main content */}
//       <main className="flex-1 p-6 bg-gray-50 overflow-auto">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default InternLayout;


import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import InternSidebar from '../components/intern/InternSidebar';

const InternLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Topbar with Hamburger (visible only on small screens) */}
      <div className="md:hidden bg-white shadow px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-blue-800">Intern Dashboard</h1>
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
        <InternSidebar />
      </div>

      {/* Background Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default InternLayout;
