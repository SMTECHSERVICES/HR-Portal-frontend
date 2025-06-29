// import { Link, useLocation } from "react-router-dom";

// const HRSidebar = () => {
//   const { pathname } = useLocation();
//   const navItemClass = (path) =>
//     `block px-4 py-2 rounded-lg ${pathname === path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'}`;

//   return (
//     <aside className="w-64 bg-white border-r h-screen p-4">
//       <h2 className="text-xl font-bold text-blue-700 mb-6">HR Dashboard</h2>
//       <nav className="space-y-2">

//          <Link to="/hr/dashboard" className={navItemClass("/hr/dashboard")}>
//           📋Hr Dashboard
//         </Link>
//         <Link to="/hr/dashboard/assignments" className={navItemClass("/hr/dashboard/assignments")}>
//           📋 Assignment Allocate
//         </Link>
//         <Link to="/hr/dashboard/attendance" className={navItemClass("/hr/dashboard/attendance")}>
//           🕒 Attendance Tracker
//         </Link>
//         <Link to="/hr/dashboard/worksheets" className={navItemClass("/hr/dashboard/worksheets")}>
//           📁 Worksheet Allocated
//         </Link>
//       </nav>
//     </aside>
//   );
// };

// export default HRSidebar;



import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaBriefcase, 
  FaThLarge, 
  FaTasks, 
  FaClock, 
  FaFileAlt,
  FaSignOutAlt
} from "react-icons/fa";

import axios from "axios";
import { server } from "../../constants/api";

const HRSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navItemClass = (path) =>
    `flex items-center px-4 py-3 rounded-lg transition-all ${
      pathname === path 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
    }`;

     const handleLogout = async()=>{
          try {
            const response = await axios.post(`${server}/hr/logout`,{},{
              withCredentials: true
            });
            alert(response?.data?.message)
            navigate('/')

          } catch (error) {
            console.log(error);
            alert('internal server error')
          }
        }
    

  return (
    <aside className="w-64 bg-white border-r h-screen p-4 flex flex-col">
      {/* Header with icon */}
      <div className="mb-6 pt-4 flex items-center">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <FaBriefcase className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-blue-700">HR Dashboard</h2>
      </div>
      
      <nav className="space-y-1 flex-1">
        <Link to="/hr/dashboard" className={navItemClass("/hr/dashboard")}>
          <FaThLarge className="mr-3 h-5 w-5" />
          HR Dashboard
        </Link>
        
        <Link to="/hr/dashboard/assignments" className={navItemClass("/hr/dashboard/assignments")}>
          <FaTasks className="mr-3 h-5 w-5" />
          Assignment Allocate
        </Link>
        
        <Link to="/hr/dashboard/attendance" className={navItemClass("/hr/dashboard/attendance")}>
          <FaClock className="mr-3 h-5 w-5" />
          Attendance Tracker
        </Link>
        
        <Link to="/hr/dashboard/worksheets" className={navItemClass("/hr/dashboard/worksheets")}>
          <FaFileAlt className="mr-3 h-5 w-5" />
          Worksheet Allocated
        </Link>

         <Link to="/hr/dashboard/internRegister" className={navItemClass("/hr/dashboard/internRegister")}>
          <FaFileAlt className="mr-3 h-5 w-5" />
          Register Intern
        </Link>
      </nav>
      
      {/* Logout at the bottom */}
      <div className="mt-auto py-4 border-t">
         <button onClick={handleLogout} className={navItemClass("/logout")}>
                 <FaSignOutAlt className="mr-3 h-5 w-5" />
                 Logout
               </button>
      </div>
    </aside>
  );
};

export default HRSidebar;