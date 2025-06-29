// import { useState } from "react";
// import HrLayout from "../../layout/HrLayout";


// const WorksheetPage = () => {

//       const [file, setFile] = useState(null);

//   const handleUpload = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please select a file");
//     console.log("Uploading file:", file);
//     alert("Worksheet uploaded successfully!");
//     // You can send this to backend using axios + FormData
//   };
//   return (
//    <>
//    <HrLayout>
//    <div>
//       <h1 className="text-2xl font-bold text-blue-700 mb-4">Worksheet Allocated</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg space-y-4">
//         <div>
//           <label className="block mb-2 font-medium">Upload Calling Data (Excel/CSV)</label>
//           <input
//             type="file"
//             accept=".xls,.xlsx,.csv"
//             onChange={handleUpload}
//             className="w-full"
//           />
//         </div>

//         <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
//           Upload Worksheet
//         </button>
//       </form>
//     </div>
//    </HrLayout>
//    </>
//   );
// };

// export default WorksheetPage;


import { useState } from "react";
import HrLayout from "../../layout/HrLayout";

const WorksheetPage = () => {
  const [file, setFile] = useState(null);

 



  return (
    <>
      <HrLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">Worksheet Allocated</h1>
          
          {/* Upload Form */}
        
          
          {/* Google Sheet Embed */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Live Worksheet</h2>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <iframe
                src="https://docs.google.com/spreadsheets/d/1yXIY58qtXEY6aOeRs6wvxOhjtfJJjcY8bZhPLsG4Gug/edit?usp=sharing"
                width="100%"
                height="600"
                frameBorder="0"
                className="min-h-[500px]"
              ></iframe>
            </div>
            
            <div className="mt-3 text-sm text-gray-600">
              <p>
                <strong>Note:</strong> Multiple users can edit this sheet simultaneously. 
                Changes will appear in real-time for all viewers.
              </p>
              <p className="mt-1">
                <a 
                  href="https://docs.google.com/spreadsheets/d/1B4Uu7KjhADUUqelrab_RjyfwXsAMF-91wBggVWeN5kw/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Open in Google Sheets ↗
                </a>
              </p>
            </div>
          </div>
        </div>
      </HrLayout>
    </>
  );
};

export default WorksheetPage;