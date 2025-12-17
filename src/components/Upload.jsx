import { useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function Upload({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const upload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    const toastId = toast.loading("Uploading files...");

    try {
      setLoading(true);

      await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Upload successful", { id: toastId });
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed", {
        id: toastId,
      });
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <label
      className={`
        flex items-center justify-center gap-2 cursor-pointer 
        bg-blue-600 text-white px-5 py-2.5 rounded-xl
        hover:bg-blue-700 active:scale-95 transition-all duration-200
        font-medium shadow-md hover:shadow-lg
        w-full sm:w-auto
        ${loading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <UploadCloud size={20} />
      )}

      <span className="text-sm sm:text-base">
        {loading ? "Uploading..." : "Upload Files"}
      </span>

      <input
        type="file"
        multiple
        onChange={upload}
        hidden
        disabled={loading}
        accept="*/*"
      />
    </label>
  );
}
