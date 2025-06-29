import InternLayout from "../../layout/InternLayout";

const WorksheetViewPage = () => {
  return (
   <>
   <InternLayout>
 <div>
      <h1 className="text-2xl font-bold text-green-700 mb-4">My Worksheets</h1>
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        
          
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
     
    </div>

   </InternLayout>
   </>
  );
};

export default WorksheetViewPage;
