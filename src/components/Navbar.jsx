// Import navigate so we can move between React pages
import { useNavigate } from "react-router-dom";

function Navbar() {

  // Create navigation function
  const navigate = useNavigate();

  return (

    // ========================================
    // NAVIGATION BAR
    // ========================================
    <nav className="navbar">


      {/* ========================================
          LOGO
          Clicking the logo returns to Home
      ======================================== */}
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >

        <span className="logo-icon">
          ⌂
        </span>

        <span>
          DreamNest
        </span>

      </div>


      {/* ========================================
          NAVIGATION LINKS
      ======================================== */}
      <div className="nav-links">


        {/* ========================================
            HOME
            Opens the homepage
        ======================================== */}
        <a
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Home
        </a>


        {/* ========================================
            FEATURES
            Scrolls to Features section
        ======================================== */}
        <a
          href="#features"
        >
          Features
        </a>


        {/* ========================================
            HOW IT WORKS
            Scrolls to How It Works section
        ======================================== */}
        <a
          href="#how"
        >
          How it works
        </a>


        {/* ========================================
            ABOUT
            Opens About page
        ======================================== */}
        <a
          onClick={() => navigate("/about")}
          style={{ cursor: "pointer" }}
        >
          About
        </a>


        {/* ========================================
            CONTACT
            Opens Contact page
        ======================================== */}
        <a
          onClick={() => navigate("/contact")}
          style={{ cursor: "pointer" }}
        >
          Contact
        </a>
        {/* ========================================
        LOGIN
         Opens Login page
         ======================================== */}
          <button
            className="login-nav-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>


        {/* ========================================
            OPEN STUDIO
            Opens Studio page
        ======================================== */}
        <button
          className="nav-button"
          onClick={() => navigate("/studio")}
        >
          Open Studio
        </button>


      </div>

    </nav>
  );
}

export default Navbar;