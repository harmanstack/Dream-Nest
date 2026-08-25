// Import navigation from React Router
import { useNavigate } from "react-router-dom";

function CTA() {

  // Create navigation function
  const navigate = useNavigate();

  return (
    // CTA section
    <section className="cta">

      {/* CTA heading */}
      <h2>
        Ready to sketch your first room?
      </h2>

      {/* CTA description */}
      <p>
        Jump into the studio and start dragging.
        Your plan saves as you go.
      </p>

      {/* Open Studio button */}
      <button
        className="primary-button"
        onClick={() => navigate("/studio")}
      >
        Open the studio →
      </button>

    </section>
  );
}

export default CTA;