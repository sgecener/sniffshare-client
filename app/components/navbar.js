import { useAppContext } from "@/context/state";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthContext } from "@/context/auth";

const Navbar = () => {
  const { token } = useAppContext();
  const navbar = useRef();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getLoggedInButtons = () => {
    return (
      <div className="md:flex items-center">
        <Link
          href="/scents/new"
          className="mr-4 py-2 px-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 mb-2 md:mb-0"
        >
          Add Scent
        </Link>
        <Link
          href="/favorites"
          className="mr-4 py-2 px-4 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300 mb-2 md:mb-0"
        >
          <svg
            className="inline-block h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Favorites
        </Link>
        <Link
          href={`/profile`}
          className="mr-4 py-2 px-4 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300 mb-2 md:mb-0"
        >
          <svg
            className="inline-block h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Profile
        </Link>
        <Link
          href="/login"
          className="mr-4 py-2 px-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 mb-2 md:mb-0"
          onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            router.push(`/login`);
          }}
        >
          Logout
        </Link>
      </div>
    );
  };

  const getLoggedOutButtons = () => {
    return (
      <div className="md:flex items-center">
        <Link
          href="/register"
          className="mr-4 py-2 px-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 mb-2 md:mb-0"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="mr-4 py-2 px-4 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300 mb-2 md:mb-0"
        >
          Log In
        </Link>
      </div>
    );
  };

  const getDropdownMenu = () => {
    const closeDropdown = () => {
      setIsOpen(false);
    };
  
    return (
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-16 right-0 bg-white shadow-md rounded-md p-4 z-10`}
      >
        <Link
          href="/scents/new"
          className="block py-2 px-4 rounded hover:bg-gray-100"
          onClick={closeDropdown}
        >
          Add Scent
        </Link>
        <Link
          href="/favorites"
          className="block py-2 px-4 rounded hover:bg-gray-100"
          onClick={closeDropdown}
        >
          Favorites
        </Link>
        <Link
          href={`/profile`}
          className="block py-2 px-4 rounded hover:bg-gray-100"
          onClick={closeDropdown}
        >
          Profile
        </Link>
        <Link
          href="/login"
          className="block py-2 px-4 rounded hover:bg-gray-100"
          onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            router.push(`/login`);
            closeDropdown(); // Close dropdown after logout
          }}
        >
          Logout
        </Link>
      </div>
    );
  };
  
  return (
    <nav className="bg-gradient-to-r from-amber-200 to-orange-500 shadow-md py-4 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
          <Link href="/" className="flex items-center">
            <svg
              className="fill-current h-10 w-10 mr-2 text-black"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span className="font-semibold text-xl tracking-tight text-black">
              SniffShare
            </span>
          </Link>
        <div className="navbar-menu flex md:hidden">
          <button
            onClick={toggleDropdown}
            className="flex items-center px-3 py-2 border rounded text-white hover:text-gray-300 hover:border-gray-300"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="navbar-end hidden md:flex">
          {isLoggedIn ? getLoggedInButtons() : getLoggedOutButtons()}
        </div>
      </div>
      <div className="md:hidden">
        {getDropdownMenu()}
      </div>
    </nav>
  );
};

export default Navbar;