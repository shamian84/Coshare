import { Link, useLocation, useNavigate } from "react-router-dom";
import { Files, Share2, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user?.name?.charAt(0).toUpperCase() || "U";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    setOpen(false);
    setMobileMenu(false);
  };

  const linkStyle = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow px-4 sm:px-6 py-3 flex items-center justify-between relative z-50">
      <div className="shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold text-black">CoShare</h1>
      </div>

      <div className="sm:hidden">
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-4">
        <div className="flex gap-2">
          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            <Files size={18} /> My Files
          </Link>

          <Link to="/shared" className={linkStyle("/shared")}>
            <Share2 size={18} /> Shared
          </Link>
        </div>

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold cursor-pointer select-none hover:bg-blue-700 transition"
          >
            {firstLetter}
          </div>

          {open && (
            <div className="absolute top-12 right-0 w-40 bg-white border rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={logout}
                className="w-full px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-2 px-4 py-4 sm:hidden z-40">
          <Link
            to="/dashboard"
            className={linkStyle("/dashboard")}
            onClick={() => setMobileMenu(false)}
          >
            <Files size={18} /> My Files
          </Link>
          <Link
            to="/shared"
            className={linkStyle("/shared")}
            onClick={() => setMobileMenu(false)}
          >
            <Share2 size={18} /> Shared
          </Link>
          <button
            onClick={logout}
            className="w-full px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-lg transition mt-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
