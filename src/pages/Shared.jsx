import { useEffect, useState } from "react";
import api from "../lib/axios";
import FileCard from "../components/FileCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Shared() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/files/shared")
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => console.error("Error fetching shared files", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Shared With Me</h2>
          <p className="text-sm text-gray-500 mt-1">
            Files that others have shared with your account.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm text-center px-4">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              No shared files yet
            </h3>
            <p className="text-gray-500 max-w-xs mx-auto">
              When someone shares a file with you, it will appear here for you
              to download.
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
