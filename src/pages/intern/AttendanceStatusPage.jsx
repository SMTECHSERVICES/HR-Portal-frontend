
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

const AttendanceStatusPage = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`${server}/intern/my-attendance`, {
          withCredentials: true
        });
        setAttendance(res?.data?.allAttendance || []);
      } catch (err) {
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <InternLayout>
      <div>
        <h1 className="text-2xl font-bold text-green-700 mb-4">My Attendance</h1>

        {loading ? (
          <p className="text-gray-500">Loading attendance...</p>
        ) : attendance.length === 0 ? (
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
              {attendance.map((record) => (
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
