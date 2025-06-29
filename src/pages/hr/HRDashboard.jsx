// import { Outlet } from "react-router-dom";
// import HRSidebar from "../../components/hr/HRSidebar";
// import HrLayout from "../../layout/HrLayout";

// const HRDashboard = () => {
//   return (
//    <HrLayout>
//     <div className="flex min-h-screen">

//       <main className="flex-1 p-6 bg-gray-50">
//         <Outlet />
//       </main>
//     </div>
//    </HrLayout>
//   );
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

const HRDashboard = () => {
    // Mock data for dashboard
    const metrics = [
        { title: "Total Employees", value: "142", icon: <FaUsers className="text-blue-500" />, change: "+5% from last month" },
        { title: "On Leave Today", value: "12", icon: <FaCalendarCheck className="text-yellow-500" />, change: "2 planned, 10 unplanned" },
        { title: "Pending Requests", value: "24", icon: <FaExclamationTriangle className="text-red-500" />, change: "8 approvals needed" },
        { title: "Upcoming Birthdays", value: "7", icon: <FaBirthdayCake className="text-pink-500" />, change: "This week" }
    ];



    return (
        <HrLayout>
            <div className="flex min-h-screen">

                <main className="flex-1 p-6 bg-gray-50">
                    {/* Dashboard Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">HR Dashboard</h1>
                            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
                        </div>

                    </div>

                    {/* Dashboard Content */}
                    <CommonCard metrics={metrics} />

                    {/* Outlet for nested routes */}
                    <div className="mt-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </HrLayout>
    );
};

export default HRDashboard;