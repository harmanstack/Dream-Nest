// useNavigate allows us to move from one React page to another
import { useNavigate } from "react-router-dom";

function Hero() {

  // Create navigate function for page navigation
  const navigate = useNavigate();

  return (
    // ================================
    // HERO SECTION
    // Main section visible on homepage
    // ================================
    <section className="hero">

      {/* ================================
          LEFT SIDE - HERO CONTENT
      ================================= */}
      <div className="hero-content">

        {/* Small label above the heading */}
        <div className="eyebrow">
          <span>●</span> 2D + 3D HOME DESIGN
        </div>

        {/* Main heading */}
        <h1>
          Design your home by
          <span> dragging.</span>
        </h1>

        {/* Description */}
        <p>
          Pull walls, doors and furniture straight onto a live floor plan.
          Snap to the grid, rotate anything, and flip to 3D to walk through
          the space you just sketched — all in your browser, no installs.
        </p>

        {/* ================================
            HERO BUTTONS
        ================================= */}
        <div className="hero-buttons">

          {/* 
            START DESIGNING BUTTON

            Clicking this button takes the user
            to the Studio page.
          */}
          <button
            className="primary-button"
            onClick={() => navigate("/studio")}
          >
            Start designing →
          </button>

          {/* 
            SEE HOW IT WORKS BUTTON

            Clicking this button scrolls down
            to the section with id="how".
          */}
          <button
            className="secondary-button"
            onClick={() => {
              document
                .getElementById("how")
                ?.scrollIntoView({
                  behavior: "smooth"
                });
            }}
          >
            See how it works
          </button>

        </div>

        {/* ================================
            STATISTICS
        ================================= */}
        <div className="stats">

          {/* Number of furniture items */}
          <div>
            <strong>40+</strong>
            <small>Furniture & fixtures</small>
          </div>

          {/* 2D and 3D feature */}
          <div>
            <strong>2D ↔ 3D</strong>
            <small>Instant switch</small>
          </div>

          {/* Installation information */}
          <div>
            <strong>0</strong>
            <small>Installs required</small>
          </div>

        </div>

      </div>

      {/* ================================
          RIGHT SIDE - HOUSE PREVIEW
      ================================= */}
      <div className="preview">

        {/* Preview labels */}
        <div className="preview-top">

          <span className="plan-tag">
            ● 2D plan
          </span>

          <span className="three-tag">
            3D preview
          </span>

        </div>

        {/* ================================
            ROOM PREVIEW
        ================================= */}
        <div className="room">

          {/* Back wall */}
          <div className="back-wall"></div>

          {/* Left wall */}
          <div className="left-wall"></div>

          {/* Right wall */}
          <div className="right-wall"></div>

          {/* Sofa */}
          <div className="sofa"></div>

          {/* Table */}
          <div className="table"></div>

          {/* Rug */}
          <div className="rug"></div>

        </div>

        {/* Information at bottom of preview */}
        <div className="preview-bottom">

          <span>
            Living room · 4.2 × 3.6 m
          </span>

          <span>
            3 items placed
          </span>

        </div>

      </div>

    </section>
  );
}

export default Hero;