import { useState } from "react";
import HrLayout from "../../layout/HrLayout";


const WorksheetPage = () => {

      const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");
    console.log("Uploading file:", file);
    alert("Worksheet uploaded successfully!");
    // You can send this to backend using axios + FormData
  };
  return (
   <>
   <HrLayout>
   <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Worksheet Allocated</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg space-y-4">
        <div>
          <label className="block mb-2 font-medium">Upload Calling Data (Excel/CSV)</label>
          <input
            type="file"
            accept=".xls,.xlsx,.csv"
            onChange={handleUpload}
            className="w-full"
          />
        </div>

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Upload Worksheet
        </button>
      </form>
    </div>
   </HrLayout>
   </>
  );
};

export default WorksheetPage;
