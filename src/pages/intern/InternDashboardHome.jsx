// import InternLayout from '../../layout/InternLayout'
// import { server } from '../../constants/api';
// import axios from 'axios';
// import { useEffect } from 'react';

// const InternDashboardHome = () => {
//   useEffect(()=>{
//     const fetchData = async()=>{
//       const response = await axios.get(`${server}/intern/my-info`,{
//         withCredentials:true
//       })
//     }

//     fetchData()
//   },[])
//   return (
//   <>
//   <InternLayout>
//       <div>
//       <h1 className="text-3xl font-bold text-green-700 mb-4">Welcome Intern 👋</h1>
//       <p className="text-gray-600">Use the sidebar to view your tasks, attendance, and worksheets.</p>
//     </div>
//   </InternLayout>
//   </>
//   );
// };

// export default InternDashboardHome;


import InternLayout from '../../layout/InternLayout'
import { server } from '../../constants/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const InternDashboardHome = () => {
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/intern/my-info`, {
          withCredentials: true
        });
        setInternData(response.data.intern);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate attendance stats
  const calculateAttendanceStats = (attendance) => {
    const presentCount = attendance.filter(a => a.status === 'Present').length;
    const absentCount = attendance.filter(a => a.status === 'Absent').length;
    const leaveCount = attendance.filter(a => a.status === 'Leave').length;
    const totalDays = attendance.length;
    
    return {
      presentCount,
      absentCount,
      leaveCount,
      presentPercentage: totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : 0
    };
  };

  if (loading) {
    return (
      <InternLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </InternLayout>
    );
  }

  if (error) {
    return (
      <InternLayout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </InternLayout>
    );
  }

  if (!internData) {
    return (
      <InternLayout>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Notice!</strong>
          <span className="block sm:inline"> No data available.</span>
        </div>
      </InternLayout>
    );
  }

  const { fullName, email, phoneNumber, university, attendance, createdAt } = internData;
  const stats = calculateAttendanceStats(attendance);

  return (
    <InternLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">Welcome, {fullName} 👋</h1>
            <p className="text-gray-600">Here's your dashboard overview</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Joined on {format(new Date(createdAt), 'MMMM d, yyyy')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">University</p>
                <p className="font-medium">{university}</p>
              </div>
            </div>
          </div>

          {/* Attendance Stats Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Attendance Summary</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Attendance Rate</span>
                  <span className="text-sm font-medium text-green-600">{stats.presentPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${stats.presentPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{stats.presentCount}</p>
                  <p className="text-xs text-gray-500">Present</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{stats.absentCount}</p>
                  <p className="text-xs text-gray-500">Absent</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{stats.leaveCount}</p>
                  <p className="text-xs text-gray-500">Leave</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Attendance</h2>
          {attendance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendance.slice(0, 5).map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format(new Date(record.date), 'MMMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${record.status === 'Present' ? 'bg-green-100 text-green-800' : 
                            record.status === 'Absent' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No attendance records found.</p>
          )}
        </div>
      </div>
    </InternLayout>
  );
};

export default InternDashboardHome;