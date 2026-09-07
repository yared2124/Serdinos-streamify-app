import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logout, isPending } = useLogout();
  const { theme, setTheme } = useThemeStore();

  const THEMES = ["light", "dark", "cupcake", "cyberpunk", "synthwave", "retro", "night", "dracula"];

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full gap-3 sm:gap-4">
          {/* LOGO - only on chat page */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Streamify
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 ml-auto">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* Theme dropdown */}
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
              <span className="text-lg">🎨</span>
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 max-h-60 overflow-y-auto z-50">
              {THEMES.map((t) => (
                <li key={t}>
                  <button
                    onClick={() => setTheme(t)}
                    className={`capitalize ${theme === t ? "active" : ""}`}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Avatar */}
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic || "/avatar.png"} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          {/* Logout */}
          <button className="btn btn-ghost btn-sm gap-2 text-error" onClick={logout} disabled={isPending}>
            <LogOutIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
