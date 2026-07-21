import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      <nav className={`sidebar ${open ? "expanded" : ""}`}>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {open && (
          <div className="sidebar-content">
            <h2 className="logo">Deskaura</h2>

            <Link to="/dashboard" onClick={() => setOpen(false)}>
              <span>📊</span>
              <span>Dashboard</span>
            </Link>

            <Link to="/jobs" onClick={() => setOpen(false)}>
              <span>💼</span>
              <span>Jobs</span>
            </Link>

            <Link to="/profile" onClick={() => setOpen(false)}>
              <span>👤</span>
              <span>Profile</span>
            </Link>

            <Link to="/settings" onClick={() => setOpen(false)}>
              <span>⚙</span>
              <span>Settings</span>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;