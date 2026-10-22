import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <span className="logo-icon">⌂</span>
        <span>DreamNest</span>
      </div>

      <div className="nav-links">
        <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</a>
        <a onClick={() => navigate("/projects")} style={{ cursor: "pointer" }}>Projects</a>
        <a href="#features">Features</a>
        <a href="#how">How it works</a>
        <a onClick={() => navigate("/about")} style={{ cursor: "pointer" }}>About</a>
        <a onClick={() => navigate("/contact")} style={{ cursor: "pointer" }}>Contact</a>
        <button className="login-nav-button" onClick={() => navigate("/login")}>Login</button>
        <button className="nav-button" onClick={() => navigate("/studio")}>Open Studio</button>
      </div>
    </nav>
  );
}

export default Navbar;
