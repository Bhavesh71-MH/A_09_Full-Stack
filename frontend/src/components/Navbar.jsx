
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `nav-link px-3 ${isActive ? "active fw-bold" : ""}`;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background: "#172554",
        boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
      }}
    >
      <div className="container py-2">
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
          style={{ letterSpacing: "-0.5px" }}
        >
          <span style={{ color: "#60a5fa" }}>Campus</span>
          <span className="text-white">Connect</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/jobs" className={linkClass}>
                Jobs
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/skills" className={linkClass}>
                Skills
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/projects" className={linkClass}>
                Projects
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/applications" className={linkClass}>
                Applications
              </NavLink>
            </li>

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <Link
                className="btn btn-outline-light px-3"
                to="/login"
              >
                Login
              </Link>
            </li>

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <Link
                className="btn px-3 fw-semibold"
                to="/register"
                style={{
                  background: "#60a5fa",
                  color: "#172554",
                  border: "1px solid #60a5fa",
                }}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;