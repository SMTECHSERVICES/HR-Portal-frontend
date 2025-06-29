
import InternLayout from '../../layout/InternLayout'

const AttendanceStatusPage = () => {
  return (
  <>
  <InternLayout>
     <div>
      <h1 className="text-2xl font-bold text-green-700 mb-4">My Attendance</h1>
      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-green-100 text-green-700">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border-t">2025-06-28</td>
            <td className="p-3 border-t">Present</td>
          </tr>
          <tr>
            <td className="p-3 border-t">2025-06-27</td>
            <td className="p-3 border-t">Absent</td>
          </tr>
        </tbody>
      </table>
    </div>
  </InternLayout>
  </>
  );
};

export default AttendanceStatusPage;
