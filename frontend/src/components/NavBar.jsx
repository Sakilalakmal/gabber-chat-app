import React from "react";
import { useAuthUser } from "../hook/useAuthUser";
import { Link, useLocation } from "react-router";
import { Aperture, BellDotIcon, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useLogOut } from "../hook/useLogout";

const NavBar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();

  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutatation } = useLogOut();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <Aperture className="size-6 text-primary" />
                <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  kouventa App
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto mr-4">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellDotIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className="avatar mr-4">
            <div className="w-9 rounded-full">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                rel="noreferrer"
              />
            </div>
          </div>

          <button
            className="btn btn-ghost btn-circle"
            onClick={logoutMutatation}
          >
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
