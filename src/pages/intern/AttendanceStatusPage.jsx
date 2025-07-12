
// import InternLayout from '../../layout/InternLayout'
// import axios from 'axios';
// import { server } from '../../constants/api';

// const AttendanceStatusPage = () => {


//   return (
//   <>
//   <InternLayout>
//      <div>
//       <h1 className="text-2xl font-bold text-green-700 mb-4">My Attendance</h1>
//       <table className="w-full bg-white shadow rounded overflow-hidden">
//         <thead className="bg-green-100 text-green-700">
//           <tr>
//             <th className="p-3 text-left">Date</th>
//             <th className="p-3 text-left">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="p-3 border-t">2025-06-28</td>
//             <td className="p-3 border-t">Present</td>
//           </tr>
//           <tr>
//             <td className="p-3 border-t">2025-06-27</td>
//             <td className="p-3 border-t">Absent</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </InternLayout>
//   </>
//   );
// };

// export default AttendanceStatusPage;


import { useEffect, useState } from 'react';
import InternLayout from '../../layout/InternLayout';
import axios from 'axios';
import { server } from '../../constants/api';
import { isThisWeek, isThisMonth, parseISO } from 'date-fns';

const AttendanceStatusPage = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | week | month

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`${server}/intern/my-attendance`, {
          withCredentials: true
        });
        const records = res?.data?.allAttendance || [];
        setAttendance(records);
        setFilteredAttendance(records); // Default to all
      } catch (err) {
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  useEffect(() => {
    let filtered = attendance;

    if (filter === 'week') {
      filtered = attendance.filter((record) =>
        isThisWeek(parseISO(record.date), { weekStartsOn: 1 }) // week starts on Monday
      );
    } else if (filter === 'month') {
      filtered = attendance.filter((record) =>
        isThisMonth(parseISO(record.date))
      );
    }

    setFilteredAttendance(filtered);
  }, [filter, attendance]);

  return (
    <InternLayout>
      <div>
        <h1 className="text-2xl font-bold text-green-700 mb-4">My Attendance</h1>

        {/* Filter Dropdown */}
        <div className="mb-4">
          <label htmlFor="filter" className="mr-2 font-medium text-gray-700">Filter By:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading attendance...</p>
        ) : filteredAttendance.length === 0 ? (
          <p className="text-red-500">No attendance records found.</p>
        ) : (
          <table className="w-full bg-white shadow rounded overflow-hidden">
            <thead className="bg-green-100 text-green-700">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record) => (
                <tr key={record._id}>
                  <td className="p-3 border-t">
                    {new Date(record.date).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="p-3 border-t">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </InternLayout>
  );
};

export default AttendanceStatusPage;
