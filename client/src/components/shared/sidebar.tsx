import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdHomeFilled } from 'react-icons/md';
import { PiChartLineUpThin, PiChartLineDownThin } from 'react-icons/pi';
import { LuLogOut } from 'react-icons/lu';
import { FaClipboardList } from 'react-icons/fa';
import { BiSolidUserAccount } from "react-icons/bi";
import Logo from './image/Logo Side.png'

interface User {
  role: string;
  // Add other properties as needed
}

const Sidebar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('@user');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    setUser(userData);
  }, []);

  const handleLogout = () => {
    // Clear local storage and reload the page
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="w-16 md:w-56 bg-white border border-gray text-gray h-full flex-shrink-0 flex flex-col">
      <div className="flex ml-8 mt-8">
        <div className="">
          <img src={Logo} alt="image" />
        </div>
      </div>
      <div>
        <ul className="flex flex-col w-12 md:w-40 items-right justify-center m-2 md:m-8">
          <li>
          <Link
              to="/"
              className={`text-gray-500 border-none rounded-full sm:rounded-lg p-4 flex items-center cursor-pointer ${
                window.location.pathname === "/" ? "hover:bg-blue-700 hover:text-white" : ""
              }`}
            >
              <MdHomeFilled />
              <span className="ml-2 md:block hidden">Dashboard</span>
            </Link>
          </li>
          <li>
          <Link
              to="/History"
              className={`text-gray-500 border-none rounded-full sm:rounded-lg p-4 flex items-center cursor-pointer ${
                window.location.pathname === "/History" ? "hover:bg-blue-700 hover:text-white" : ""
              }`}
            >
              <FaClipboardList />
              <span className="ml-2 md:block hidden">เวชระเบียบ</span>
            </Link>
          </li>
          <li>
            <Link
              to="/ReferIn"
              className="text-gray-500 border-none rounded-full sm:rounded-lg p-4 hover:bg-blue-700 hover:text-white cursor-pointer flex items-center"
            >
              <PiChartLineDownThin />
              <span className="ml-2 md:block hidden">Refer In</span>
            </Link>
          </li>
          <li>
            <Link
              to="/ReferOut"
              className="text-gray-500 border-none rounded-full sm:rounded-lg p-4 hover:bg-blue-700 hover:text-white cursor-pointer flex items-center"
            >
              <PiChartLineUpThin />
              <span className="ml-2 md:block hidden">Refer Out</span>
            </Link>
          </li>
          {user?.role === '1' && (
            <li>
              <Link
                to="/Register"
                className="text-gray-500 border-none rounded-full sm:rounded-lg p-4 hover:bg-blue-700 hover:text-white cursor-pointer flex items-center"
              >
                <BiSolidUserAccount />
                <span className="ml-2 md:block hidden">Creat Account</span>
              </Link>
            </li>
          )}
          <li>
            <a
              onClick={handleLogout}
              className="text-gray-500 border-none rounded-full sm:rounded-lg p-4 hover:bg-blue-700 hover:text-white cursor-pointer flex items-center"
            >
              <LuLogOut />
              <span className="ml-2 md:block hidden">Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
