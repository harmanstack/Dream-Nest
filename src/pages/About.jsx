import Navbar from "../components/Navbar";

// ========================================
// DREAMNEST ABOUT PAGE
// ========================================

function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">

      {/* ========================================
          ABOUT HERO
      ======================================== */}
      <section className="about-hero">

        <span className="eyebrow">
          ● ABOUT DREAMNEST
        </span>

        <h1>
          Build the House
          <span> you imagine.</span>
        </h1>

        <p>
          DreamNest is a modern home inspiration and planning platform
          designed to make home design simple, visual, and accessible
          to everyone.
        </p>

      </section>


      {/* ========================================
          ABOUT CONTENT
      ======================================== */}
      <section className="about-grid">

        {/* Our Mission */}
        <div className="about-card">

          <div className="about-icon">
            ✦
          </div>

          <h2>
            Our Mission
          </h2>

          <p>
            We believe designing a home should be creative and
            enjoyable instead of complicated. DreamNest helps users
            turn ideas into visual home plans using simple tools.
          </p>

        </div>


        {/* What We Offer */}
        <div className="about-card">

          <div className="about-icon">
            ⌂
          </div>

          <h2>
            What We Offer
          </h2>

          <p>
            Explore home designs, experiment with furniture layouts,
            create floor plans, estimate budgets, and visualize your
            ideas in one place.
          </p>

        </div>


        {/* Our Vision */}
        <div className="about-card">

          <div className="about-icon">
            ◇
          </div>

          <h2>
            Our Vision
          </h2>

          <p>
            Our vision is to create an easy-to-use digital space where
            anyone can explore, plan, and personalize their dream home.
          </p>

        </div>

      </section>


      {/* ========================================
          TECHNOLOGY SECTION
      ======================================== */}
      <section className="technology">

        <h2>
          Built with modern web technology
        </h2>

        <div className="technology-grid">

          <div>
            <strong>React</strong>
            <span>Interactive UI</span>
          </div>

          <div>
            <strong>CSS Grid</strong>
            <span>Responsive layouts</span>
          </div>

          <div>
            <strong>JavaScript</strong>
            <span>Dynamic interactions</span>
          </div>

        </div>

      </section>

    </div>
    </>
  );
}

export default About;