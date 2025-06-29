// import HrLayout from "../../layout/HrLayout";
// import { useState } from "react";

// const AttendancePage = () => {
//   const [formData, setFormData] = useState({
//     internName: "",
//     date: "",
//     status: "Present",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Attendance marked:", formData);
//     alert("Attendance marked successfully!");
//     // You can send this to backend using axios.post()
//   };
//   return (
//    <>
//    <HrLayout>
//     <div>
//       <h1 className="text-2xl font-bold text-blue-700 mb-4">Attendance Tracker</h1>

//       <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-white p-6 rounded-lg shadow">
//         <div>
//           <label className="block mb-1 font-medium">Intern Name</label>
//           <input
//             type="text"
//             name="internName"
//             value={formData.internName}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//             placeholder="Enter intern's name"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Date</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option>Present</option>
//             <option>Absent</option>
//             <option>Leave</option>
//           </select>
//         </div>

//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//           Mark Attendance
//         </button>
//       </form>
//     </div>
//    </HrLayout>
//    </>
//   );
// };

// export default AttendancePage;



import HrLayout from "../../layout/HrLayout";
import { useState } from "react";
import {server} from '../../constants/api';
import axios from 'axios'

const AttendancePage = () => {
  const [formData, setFormData] = useState({
    internName: "",
    email: "",
    date: "",
    status: "Present",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/hr/markAttendance`,{
        ...formData
      },{
        withCredentials:true
      });
      console.log(response);
      alert(response?.data?.message);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message)
    }
    
  };
  return (
   <>
   <HrLayout>
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Attendance Tracker</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block mb-1 font-medium">Intern Name</label>
          <input
            type="text"
            name="internName"
            value={formData.internName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter intern's name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter intern's email"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Present</option>
            <option>Absent</option>
            <option>Leave</option>
          </select>
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Mark Attendance
        </button>
      </form>
    </div>
   </HrLayout>
   </>
  );
};

export default AttendancePage;