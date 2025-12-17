import { useEffect, useState } from "react";
import api from "../lib/axios";
import Upload from "../components/Upload";
import FileCard from "../components/FileCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      const res = await api.get("/api/files/my");
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Files</h2>
            <p className="text-sm text-gray-500">
              Manage and share your uploaded documents
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <Upload onSuccess={fetchFiles} />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-xl"
              ></div>
            ))}
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-gray-400 mb-2 text-4xl">📂</div>
            <h3 className="text-lg font-medium text-gray-900">No files yet</h3>
            <p className="text-gray-500">
              Upload your first file to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {files.map((file) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
