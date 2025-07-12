import axios from 'axios';
import { server } from '../../constants/api';

const ExportDashboardExcel = () => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`${server}/hr/export-interns`, {
        responseType: 'blob', // Important for binary file
        withCredentials: true, // Send cookies
      });

      // Create a URL for the file blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'dashboard-data.xlsx'); // Set file name
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download Excel file.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 mt-7 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Download Dashboard Excel
    </button>
  );
};

export default ExportDashboardExcel;