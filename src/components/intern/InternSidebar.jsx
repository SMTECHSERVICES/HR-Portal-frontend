import { Link, useLocation } from "react-router-dom";
import { FaThLarge, FaTasks, FaClock, FaFileAlt, FaSignOutAlt } from "react-icons/fa";

const InternSidebar = () => {
  const { pathname } = useLocation();
  const navItemClass = (path) =>
    `flex items-center px-4 py-3 rounded-lg transition-all ${
      pathname === path
        ? 'bg-green-600 text-white shadow-md'
        : 'text-gray-700 hover:bg-green-100 hover:text-green-700'
    }`;

  return (
    <aside className="w-64 bg-white border-r h-screen p-4 flex flex-col">
      <div className="mb-6 pt-4 flex items-center">
        <div className="bg-green-100 p-2 rounded-lg mr-3">
          <FaThLarge className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-green-700">Intern Panel</h2>
      </div>

      <nav className="space-y-1 flex-1">
        <Link to="/intern/dashboard" className={navItemClass("/intern/dashboard")}>
          <FaThLarge className="mr-3 h-5 w-5" />
          Dashboard Home
        </Link>
        <Link to="/intern/dashboard/tasks" className={navItemClass("/intern/dashboard/tasks")}>
          <FaTasks className="mr-3 h-5 w-5" />
          My Tasks
        </Link>
        <Link to="/intern/dashboard/attendance" className={navItemClass("/intern/dashboard/attendance")}>
          <FaClock className="mr-3 h-5 w-5" />
          My Attendance
        </Link>
        <Link to="/intern/dashboard/worksheets" className={navItemClass("/intern/dashboard/worksheets")}>
          <FaFileAlt className="mr-3 h-5 w-5" />
          Worksheets
        </Link>
      </nav>

      <div className="mt-auto py-4 border-t">
        <Link to="/logout" className={navItemClass("/logout")}>
          <FaSignOutAlt className="mr-3 h-5 w-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default InternSidebar;
