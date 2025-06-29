import HrLayout from "../../layout/HrLayout";
import { useState } from "react";
import axios from 'axios'
import {server} from '../../constants/api'

const AssignmentPage = () => {
  const [formData, setFormData] = useState({
    internName: "",
    email: "",
    taskTitle: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/hr/assignTask`,{
        ...formData
      },{
        withCredentials:true
      })
      console.log(response)
      alert(response?.data?.message);
       setFormData({
      internName: "",
      email: "",
      taskTitle: "",
      description: "",
      deadline: ""
    });
    } catch (error) {
      console.log(error);
      alert(error?.response?.data.message)
    }
   
    
  };

  return (
    <HrLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Assignment Allocation</h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block mb-1 font-medium">Intern Name</label>
            <input
              type="text"
              name="internName"
              value={formData.internName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter intern's full name"
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
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter intern's email address"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Task Title</label>
            <input
              type="text"
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Market research"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Task Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detailed description of the task"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full"
          >
            Assign Task
          </button>
        </form>
      </div>
    </HrLayout>
  );
};

export default AssignmentPage;