import { Download, Link2, FileText, Loader2 } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

export default function FileCard({ file }) {
  const [loading, setLoading] = useState(false);

  const generateLink = async () => {
    try {
      setLoading(true);
      const res = await api.post(`/share-link/${file._id}/link`);
      await navigator.clipboard.writeText(res.data.url);
      toast.success("Share link copied to clipboard 🔗");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate share link");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/files/${file._id}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = file.originalName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Download started ");
    } catch (err) {
      console.error(err);
      toast.error("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 w-full h-full min-h-80 justify-between">
      {/* Top Section: Icon and Labels */}
      <div className="flex flex-col items-center w-full">
        <div className="p-4 sm:p-5 bg-blue-50 rounded-2xl mb-4 group-hover:bg-blue-100 transition-colors">
          <FileText className="text-blue-600 w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <div className="w-full px-2">
          <p
            className="font-bold text-gray-800 text-base sm:text-lg leading-tight truncate w-full"
            title={file.originalName}
          >
            {file.originalName}
          </p>
          <p className="text-xs font-semibold text-gray-400 mt-2 uppercase tracking-widest">
            {file.size > 1024 * 1024
              ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
              : `${(file.size / 1024).toFixed(1)} KB`}
          </p>
        </div>
      </div>

      {/* Bottom Section: Actions */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full mt-6">
        <button
          onClick={generateLink}
          disabled={loading}
          className="flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 font-medium border border-gray-100"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Link2 size={16} />
          )}
          <span className="text-xs sm:text-sm">Link</span>
        </button>

        <button
          onClick={downloadFile}
          disabled={loading}
          className="flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-green-600 hover:text-white transition-all disabled:opacity-50 font-medium border border-gray-100"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          <span className="text-xs sm:text-sm">Save</span>
        </button>
      </div>
    </div>
  );
}
