import { useNavigate } from 'react-router-dom';

function LoginLayout({ eyebrow, title, description, children }) {
  const navigate = useNavigate();

  return (
    <main className="login-page login-screen">
      <section className="login-showcase">
        <div className="showcase-content">
          <button className="login-brand login-brand-button" type="button" onClick={() => navigate('/')}>
            <span>⌂</span>
            DreamNest
          </button>
          <span className="login-eyebrow">● DESIGN YOUR DREAM</span>
          <h1>Your dream home<span> starts here.</span></h1>
          <p>
            Explore ideas, create floor plans, arrange furniture,
            and bring your vision to life with DreamNest.
          </p>
          <div className="mini-plan" aria-hidden="true">
            <div className="mini-room room-one">Living Room</div>
            <div className="mini-room room-two">Bedroom</div>
            <div className="mini-room room-three">Kitchen</div>
          </div>
        </div>
      </section>

      <section className="login-form-area">
        <div className="login-card login-form-card">
          <button
            className="login-close"
            type="button"
            onClick={() => navigate('/')}
            aria-label="Back to DreamNest home"
          >
            ×
          </button>
          <div className="login-heading">
            <span>{eyebrow}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          {children}
          <button className="login-back" type="button" onClick={() => navigate('/')}>
            ← Back to DreamNest
          </button>
        </div>
      </section>
    </main>
  );
}

export function LoginMessage({ children }) {
  if (!children) return null;
  return <div className="login-message-error" role="alert">{children}</div>;
}

export default LoginLayout;
