import InternLayout from "../../layout/InternLayout";

const WorksheetViewPage = () => {
  return (
   <>
   <InternLayout>
 <div>
      <h1 className="text-2xl font-bold text-green-700 mb-4">My Worksheets</h1>
      <p>You can download your assigned worksheets below:</p>
      <div className="mt-6 space-y-4">
        <a
          href="/dummy-call-data.xlsx"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          download
        >
          📥 Download Worksheet - June 2025
        </a>
        <a
          href="/leads-assigned.xlsx"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          download
        >
          📥 Download Worksheet - July 2025
        </a>
      </div>
    </div>

   </InternLayout>
   </>
  );
};

export default WorksheetViewPage;
