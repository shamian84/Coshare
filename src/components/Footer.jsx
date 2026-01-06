import { Github, Globe, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Side: Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-gray-900">CoShare</span>
              <span className="text-gray-300">|</span>
              <p className="text-sm text-gray-500">Secure Storage</p>
            </div>
            <p className="text-xs text-gray-400">
              © {currentYear} CoShare Inc. All rights reserved.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-sm text-gray-400">
            <span>Share With CoShare</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/shamian84"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="shadow-dev-1.preview.emergentagent.com"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="Website"
            >
              <Globe size={20} />
            </a>
            <div className="h-4 w-px bg-gray-200"></div>
            <a
              href=""
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Privacy
            </a>
            <a
              href=""
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
