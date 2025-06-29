import HrLayout from "../../layout/HrLayout";
import { useState } from "react";

const AssignmentPage = () => {

      const [formData, setFormData] = useState({
    internName: "",
    taskTitle: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assignment Data Submitted:", formData);
    alert("Task assigned successfully!");
    // You can send this to backend using axios.post()
  };

  return (
   <>
   <HrLayout>
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Assignment Allocate</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block mb-1 font-medium">Intern Name</label>
          <input
            type="text"
            name="internName"
            value={formData.internName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter intern's full name"
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
            className="w-full p-2 border rounded"
            placeholder="e.g. Market research"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Task Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Brief about the task"
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
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Assign Task
        </button>
      </form>
    </div>
   </HrLayout>
   </>
  );
};

export default AssignmentPage;
