// ========================================
// DREAMNEST LOGIN PAGE
// ========================================

import { useNavigate } from "react-router-dom";

function Login() {

  // Navigation function
  const navigate = useNavigate();

  return (

    <div className="login-page">

      {/* ========================================
          LEFT SIDE - BRANDING
      ======================================== */}
      <div className="login-showcase">

        <div className="showcase-content">

          <div className="login-brand">
            <span>⌂</span>
            DreamNest
          </div>

          <span className="login-eyebrow">
            ● DESIGN YOUR DREAM
          </span>

          <h1>
            Your dream home
            <span> starts here.</span>
          </h1>

          <p>
            Explore ideas, create floor plans, arrange furniture,
            and bring your vision to life with DreamNest.
          </p>

          {/* Small visual */}
          <div className="mini-plan">

            <div className="mini-room room-one">
              Living Room
            </div>

            <div className="mini-room room-two">
              Bedroom
            </div>

            <div className="mini-room room-three">
              Kitchen
            </div>

          </div>

        </div>

      </div>


      {/* ========================================
          RIGHT SIDE - LOGIN FORM
      ======================================== */}
      <div className="login-form-area">

        <div className="login-card">

          {/* Close / Back button */}
          <button
            className="login-close"
            onClick={() => navigate("/")}
          >
            ×
          </button>


          {/* Heading */}
          <div className="login-heading">

            <span>
              WELCOME BACK
            </span>

            <h2>
              Login to DreamNest
            </h2>

            <p>
              Continue designing your perfect home.
            </p>

          </div>


          {/* ========================================
              LOGIN FORM
          ======================================== */}
          <form
            onSubmit={(e) => {
              e.preventDefault();

              // Evaluation 1 navigation
              navigate("/studio");
            }}
          >

            {/* Email */}
            <div className="login-field">

              <label>
                Email address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                required
              />

            </div>


            {/* Password */}
            <div className="login-field">

              <div className="password-row">

                <label>
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>

              </div>

              <input
                type="password"
                placeholder="Enter your password"
                required
              />

            </div>


            {/* Remember me */}
            <label className="remember-me">

              <input
                type="checkbox"
              />

              <span>
                Remember me
              </span>

            </label>


            {/* Login */}
            <button
              type="submit"
              className="login-main-button"
            >
              Login
              <span>→</span>
            </button>

          </form>


          {/* Signup */}
          <div className="login-signup">

            Don't have an account?

            <button
              onClick={() => navigate("/signup")}
            >
              Create one
            </button>

          </div>


          {/* Back home */}
          <button
            className="login-back"
            onClick={() => navigate("/")}
          >
            ← Back to DreamNest
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;