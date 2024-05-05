import { useAppContext } from "@/context/state";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthContext } from "@/context/auth";

const Navbar = () => {
  const { token } = useAppContext();
  const navbar = useRef();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuthContext()
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const getLoggedInButtons = () => {
    return (
      <div>
        <div>
          <Link href="/scents/new">Add a Scent</Link>
        </div>
        <div>
          <Link href="/favorites">Favorite Scents</Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <Link href={`/profile`}>User Profile</Link>
          </div>
        </div>
        <div>
          <Link
            href="/login"
            className="navbar-item"
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
        <div className="navbar-item">
          <div className="buttons">
            <Link href="/register">
              <strong>Sign up</strong>
            </Link>
          </div>
          <div>
            <Link href="/login">Log in</Link>
          </div>
        </div>
      </>
    );
  };

  return (
    <nav className="navbar is-primary" ref={navbar}>
      <div className="navbar-brand">
        <Link href="/">
          <h1>SniffShare</h1>
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
