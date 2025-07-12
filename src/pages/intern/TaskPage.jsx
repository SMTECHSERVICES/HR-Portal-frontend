


import InternLayout from "../../layout/InternLayout";
import axios from "axios";
import { server } from "../../constants/api";
import { useEffect, useState } from "react";
import { format } from 'date-fns';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/intern/my-tasks`, {
          withCredentials: true
        });
        console.log(response);
        setTasks(response.data.myTasks);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTaskCompletion = async (taskId) => {
    try {
      await axios.patch(`${server}/intern/tasks/${taskId}/toggle`, {}, {
        withCredentials: true
      });
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, isComplete: !task.isComplete } : task
      ));
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  if (loading) {
    return (
      <InternLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
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

  return (
    <InternLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-green-700 mb-6">My Assigned Tasks</h1>
        
        {tasks.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-6 rounded-lg text-center">
            <p className="text-lg">No tasks assigned yet!</p>
            <p className="text-sm mt-1">Check back later or contact your HR.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task._id}
                className={`p-4 border rounded-lg shadow-sm transition-all duration-200 ${
                  task.isComplete 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-semibold text-lg ${
                      task.isComplete ? 'text-green-700 line-through' : 'text-gray-800'
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                    <div className="mt-2 flex items-center">
                      <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-sm text-gray-500">
                        Due: {format(new Date(task.deadline), 'MMM d, yyyy')}
                      </span>
                      {task.pptFile && (
                        <span className="ml-4 text-blue-600 hover:text-blue-800 font-semibold underline text-sm">
                          <a href={task.pptFile} target="_blank" rel="noopener noreferrer" download>
                            See task link here
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTaskCompletion(task._id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      task.isComplete
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {task.isComplete ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </InternLayout>
  );
};

export default TaskPage;
