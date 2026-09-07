import { Link } from "react-router-dom";
import { ShipWheelIcon } from "lucide-react";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex">
        {showSidebar && (
          <aside className="w-64 min-h-screen bg-base-200 border-r border-base-300 hidden lg:flex flex-col p-4 gap-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <ShipWheelIcon className="size-8 text-primary" />
              <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Streamify
              </span>
            </Link>

            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                className="btn btn-ghost justify-start gap-3 px-3"
              >
                🏠 <span>Home</span>
              </Link>
              <Link
                to="/notifications"
                className="btn btn-ghost justify-start gap-3 px-3"
              >
                🔔 <span>Notifications</span>
              </Link>
            </nav>
          </aside>
        )}

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
