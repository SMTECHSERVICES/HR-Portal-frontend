



// import {
//     FaBirthdayCake,
//     FaCalendarCheck,
//     FaExclamationTriangle,
//     FaUsers
// } from "react-icons/fa";
// import { Outlet } from "react-router-dom";
// import CommonCard from "../../components/CommonCard";
// import HrLayout from "../../layout/HrLayout";
// import axios from "axios";
// import { server } from "../../constants/api";
// import { useEffect } from "react";

// const HRDashboard = () => {
//     // Mock data for dashboard
//     const metrics = [
//         { title: "Total Employees", value: "142", icon: <FaUsers className="text-blue-500" />, change: "+5% from last month" },
//         { title: "On Leave Today", value: "12", icon: <FaCalendarCheck className="text-yellow-500" />, change: "2 planned, 10 unplanned" },
//         { title: "Pending Requests", value: "24", icon: <FaExclamationTriangle className="text-red-500" />, change: "8 approvals needed" },
//         { title: "Upcoming Birthdays", value: "7", icon: <FaBirthdayCake className="text-pink-500" />, change: "This week" }
//     ];

//     useEffect(()=>{

//         const fetchData = async()=>{
//             try {
//                 const respnse = await axios.get(`${server}/hr/allInfo`);
                
//             } catch (error) {
                
//             }
//         }
//     },[])



//     return (
//         <HrLayout>
//             <div className="flex min-h-screen">

//                 <main className="flex-1 p-6 bg-gray-50">
//                     {/* Dashboard Header */}
//                     <div className="flex justify-between items-center mb-6">
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800">HR Dashboard</h1>
//                             <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
//                         </div>

//                     </div>

//                     {/* Dashboard Content */}
//                     <CommonCard metrics={metrics} />

//                     {/* Outlet for nested routes */}
//                     <div className="mt-6">
//                         <Outlet />
//                     </div>
//                 </main>
//             </div>
//         </HrLayout>
//     );
// };

// export default HRDashboard;



import {
  FaBirthdayCake,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaUsers
} from "react-icons/fa";
import { Outlet } from "react-router-dom";
import CommonCard from "../../components/CommonCard";
import HrLayout from "../../layout/HrLayout";
import axios from "axios";
import { server } from "../../constants/api";
import { useEffect, useState } from "react";

const HRDashboard = () => {
  const [metricsData, setMetricsData] = useState({
    totalInterns: 0,
    presentToday: 0,
    leaveToday: 0,
    upcomingAssignments: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/hr/allInfo`,{
          withCredentials:true
        });
        setMetricsData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const metrics = [
    {
      title: "Total Interns",
      value: metricsData.totalInterns,
      icon: <FaUsers className="text-blue-500" />,
      change: "Overall registered interns"
    },
    {
      title: "Present Today",
      value: metricsData.presentToday,
      icon: <FaCalendarCheck className="text-green-600" />,
      change: "Marked as present"
    },
    {
      title: "On Leave Today",
      value: metricsData.leaveToday,
      icon: <FaCalendarCheck className="text-yellow-500" />,
      change: "Marked on leave"
    },
    {
      title: "Upcoming Assignments",
      value: metricsData.upcomingAssignments,
      icon: <FaBirthdayCake className="text-purple-500" />,
      change: "Deadline after today"
    }
  ];

  return (
    <HrLayout>
      <div className="flex min-h-screen">
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">HR Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-600 text-lg">Loading dashboard data...</p>
          ) : (
            <CommonCard metrics={metrics} />
          )}

          <div className="mt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </HrLayout>
  );
};

export default HRDashboard;
