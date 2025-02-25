import { NavLink } from "react-router-dom";
import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";

export function SideNavBar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <div
        className={`h-full bg-gray-800 text-white transition-all duration-300 ${
          isExpanded ? "w-64" : "w-0"
        }`}
      >
        <div className="p-4 text-2xl font-semibold whitespace-nowrap">Hi</div>
        <nav className="mt-4">
          <ul className="space-y-2 overflow-hidden whitespace-nowrap">
            <li className="hover:bg-gray-700 ease-out bg-transparent duration-300">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `block p-4 ${isActive ? "!bg-gray-700" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="hover:bg-gray-700 ease-out bg-transparent duration-300">
              <NavLink
                to="/daily"
                className={({ isActive }) =>
                  `block p-4 ${isActive ? "!bg-gray-700" : ""}`
                }
              >
                Daily
              </NavLink>
            </li>
            <li className="hover:bg-gray-700 ease-out bg-transparent duration-300">
              <NavLink
                to="/resume"
                className={({ isActive }) =>
                  `block p-4 ${isActive ? "!bg-gray-700" : ""}`
                }
              >
                Resume
              </NavLink>
            </li>
            <li className="hover:bg-gray-700 ease-out bg-transparent duration-300">
              <NavLink
                to="/dev"
                className={({ isActive }) =>
                  `block p-4 ${isActive ? "!bg-gray-700" : ""}`
                }
              >
                Dev
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`fixed top-4 transition-all duration-300 z-10 bg-gray-800 text-white p-2 rounded-r-lg hover:bg-gray-700 ${
          isExpanded ? "left-64" : "left-0"
        }`}
      >
        <IconChevronLeft
          className={`transform transition-transform duration-300 ${
            isExpanded ? "" : "rotate-180"
          }`}
        />
      </button>
    </>
  );
}
