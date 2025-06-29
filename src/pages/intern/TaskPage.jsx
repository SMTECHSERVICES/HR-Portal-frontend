import InternLayout from "../../layout/InternLayout";

const TaskPage = () => {
  return (
   <>
   <InternLayout>
     <div>
      <h1 className="text-2xl font-bold text-green-700 mb-4">My Assigned Tasks</h1>
      <p>List of tasks assigned by HR will appear here.</p>
      {/* Example static content */}
      <ul className="mt-4 space-y-3">
        <li className="p-3 border rounded bg-white shadow-sm">
          <strong>Task:</strong> Market Research<br />
          <strong>Deadline:</strong> 2025-07-05
        </li>
        <li className="p-3 border rounded bg-white shadow-sm">
          <strong>Task:</strong> Call 100 leads<br />
          <strong>Deadline:</strong> 2025-07-02
        </li>
      </ul>
    </div>
   </InternLayout>
   </>
  );
};

export default TaskPage;
