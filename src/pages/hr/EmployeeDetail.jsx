import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HrLayout from '../../layout/HrLayout';
import { server } from '../../constants/api';
import axios from 'axios';
import { format, parseISO, isToday } from 'date-fns';
import { 
  FaCheck, 
  FaExclamation, 
  FaTimes, 
  FaCalendarMinus,
  FaExclamationCircle,
  FaArrowLeft,
  FaUser
} from 'react-icons/fa';
import { BiCalendarWeek } from 'react-icons/bi';
import { MdEventBusy } from 'react-icons/md';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/hr/getEmployeeDetail/${id}`, {
          withCredentials: true
        });
        setEmployee(response.data.user);
      } catch (err) {
        console.error('Error fetching employee details:', err);
        setError('Failed to load employee data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

const markAttendance = async (status) => {
  try {
    const response = await axios.post(
      `${server}/hr/markAttendance/${id}`,
      { status },
      { withCredentials: true }
    );

    alert(response?.data?.message);

    // Directly update attendance from backend response
    setEmployee(prev => ({
      ...prev,
      attendance: response?.data?.attendance || prev.attendance
    }));

  } catch (err) {
    console.error('Error marking attendance:', err);
    setError('Failed to mark attendance');
  }
};

  const filterAttendance = () => {
    if (!employee || !employee.attendance) return [];
    
    const now = new Date();
    
    switch (attendanceFilter) {
      case 'week':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return employee.attendance.filter(a => 
          parseISO(a.date) > oneWeekAgo
        );
        
      case 'month':
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return employee.attendance.filter(a => 
          parseISO(a.date) > oneMonthAgo
        );
        
      default:
        return employee.attendance;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Half Day': return 'bg-yellow-100 text-yellow-800';
      case 'Leave': return 'bg-blue-100 text-blue-800';
      case 'Week off': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <HrLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </HrLayout>
    );
  }

  if (!employee) {
    return (
      <HrLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Not Found</h2>
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 mx-auto"
            >
              <FaArrowLeft /> Back to Employees
            </button>
          </div>
        </div>
      </HrLayout>
    );
  }

  const filteredAttendance = filterAttendance();

  return (
    <HrLayout>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Employee Profile Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-6 flex items-center justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
                {employee.profileImage ? (
                  <img 
                    src={employee.profileImage} 
                    alt={employee.fullName} 
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <FaUser className="text-5xl text-gray-500" />
                )}
              </div>
            </div>
            <div className="p-6 md:p-8 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{employee.fullName}</h1>
                  <p className="mt-2 text-gray-600">{employee.email}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <span>📱</span> {employee.phoneNumber}
                    </div>
                    <div className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <span>🏫</span> {employee.university}
                    </div>
                    <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <span>📅</span> Joined: {format(parseISO(employee.createdAt), 'dd MMM yyyy')}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/hr/dashboard/employees')}
                  className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <FaArrowLeft /> Back to List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Marking Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Mark Today's Attendance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <button
              onClick={() => markAttendance('Present')}
              className="px-4 py-3 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <FaCheck className="text-xl" />
              Present
            </button>
            <button
              onClick={() => markAttendance('Half Day')}
              className="px-4 py-3 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center justify-center gap-1"
            >
              <FaExclamation className="text-xl" />
              Half Day
            </button>
            <button
              onClick={() => markAttendance('Absent')}
              className="px-4 py-3 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-1"
            >
              <FaTimes className="text-xl" />
              Absent
            </button>
            <button
              onClick={() => markAttendance('Leave')}
              className="px-4 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1"
            >
              <MdEventBusy className="text-xl" />
              Leave
            </button>

              <button
              onClick={() => markAttendance('Week off')}
              className="px-4 py-3 cursor-pointer bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-1"
            >
              <BiCalendarWeek className="text-xl" />
              Week off
            </button>
          </div>
        </div>

        {/* Assignments Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Assignments</h2>
          {employee.assignment.length === 0 ? (
            <p className="text-gray-500 italic">No assignments found</p>
          ) : (
            <div className="space-y-4">
              {employee.assignment.map((assignment) => (
                <div 
                  key={assignment._id} 
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg text-gray-900">{assignment.title}</h3>
                      <p className="text-gray-600 mt-1">{assignment.description}</p>
                    </div>
                    <div className="flex flex-col items-end min-w-[120px]">
                      <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                        assignment.isComplete 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.isComplete ? (
                          <><FaCheck size={12} /> Completed</>
                        ) : (
                          <><FaExclamation size={12} /> Pending</>
                        )}
                      </span>
                      <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
                        <FaCalendarMinus size={12} />
                        Deadline: {format(parseISO(assignment.deadline), 'dd MMM yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-xl font-bold text-gray-800">Attendance History</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setAttendanceFilter('all')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  attendanceFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setAttendanceFilter('week')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  attendanceFilter === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setAttendanceFilter('month')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  attendanceFilter === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                This Month
              </button>
            </div>
          </div>

          {filteredAttendance.length === 0 ? (
            <p className="text-gray-500 italic">No attendance records found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAttendance.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(parseISO(record.date), 'dd MMM yyyy')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center gap-1 ${getStatusColor(record.status)}`}>
                          {record.status === 'Present' && <FaCheck size={10} />}
                          {record.status === 'Half Day' && <FaExclamation size={10} />}
                          {record.status === 'Absent' && <FaTimes size={10} />}
                          {record.status === 'Leave' && <MdEventBusy size={10} />}
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                        {format(parseISO(record.date), 'EEEE')}
                        {isToday(parseISO(record.date)) && (
                          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            <FaCalendarMinus size={10} /> Today
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </HrLayout>
  );
};

export default EmployeeDetail;