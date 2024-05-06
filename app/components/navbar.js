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

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const getLoggedInButtons = () => {
    return (
      <div className="flex">
        <div className="mr-3">
          <Link
            href="/scents/new"
            className="inline-block rounded py-1 px-3 hover:bg-red-50 bg-red-400 hover:text-red-400 text-black " 
          >
            Add a Scent!
          </Link>
        </div>
        <div className="mr-3">
          <Link href="/favorites" className="inline-block border border-black rounded hover:border-green-300 text-black-1000 hover:bg-green-300 py-1 px-3">Favorite Scents</Link>
        </div>
        <div className="mr-3">
          <Link href={`/profile`} className="inline-block border border-black rounded hover:border-green-300 text-black-1000 hover:bg-green-300 py-1 px-3">User Profile</Link>
        </div>
        <div className="mr-3">
          <Link
            href="/login"
            className="inline-block border border-black rounded hover:border-red-500 text-black-1000 hover:bg-red-500 py-1 px-3"
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              router.push(`/login`);
            }}
            
          >
            Log out
          </Link>
        </div>
      </div>
    );
  };

  const getLoggedOutButtons = () => {
    return (
      <>
        <div className="flex">
          <div className="mr-3">
            <Link href="/register" className="inline-block border border-black rounded hover:border-green-300 text-black-1000 hover:bg-green-300 py-1 px-3">
              <strong>Sign up</strong>
            </Link>
          </div>
          <div className="mr-3">
            <Link href="/login" className="inline-block border border-black rounded hover:border-green-300 text-black-1000 hover:bg-green-300 py-1 px-3">Log in</Link>
          </div>
        </div>
      </>
    );
  };

  return (
    <nav
      className="flex items-center justify-between flex-wrap bg-orange-300 p-6 border rounded "
      ref={navbar}
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/">
          <svg
            class="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">
            SniffShare
          </span>
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          {isLoggedIn ? getLoggedInButtons() : getLoggedOutButtons()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
