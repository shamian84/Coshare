import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, Download, Loader2, AlertCircle } from "lucide-react";
import api from "../lib/axios";

export default function ShareView() {
  const { token } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/share-link/info/${token}`)
      .then((res) => setFile(res.data))
      .catch((err) => {
        setError(
          err.response?.data?.message || "This link has expired or is invalid."
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleDownload = async () => {
    try {
      const downloadUrl = `${
        import.meta.env.VITE_API_URL
      }/share-link/download/${token}`;
      window.open(downloadUrl, "_blank");
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Link Expired</h1>
        <p className="text-gray-500 mt-2 max-w-sm">{error}</p>
        <a href="/" className="mt-6 text-blue-600 font-medium hover:underline">
          Go to CoShare
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText size={40} className="text-blue-600" />
        </div>

        <h2
          className="text-2xl font-bold text-gray-900 truncate mb-1"
          title={file.originalName}
        >
          {file.originalName}
        </h2>

        <p className="text-sm font-semibold text-gray-400 mb-8 uppercase tracking-widest">
          {(file.size / 1024).toFixed(1)} KB
        </p>

        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
        >
          <Download size={22} />
          Download File
        </button>

        <p className="mt-6 text-xs text-gray-400">
          Securely shared via <span className="font-bold">CoShare</span>
        </p>
      </div>
    </div>
  );
}
