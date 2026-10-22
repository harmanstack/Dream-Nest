import { useState } from 'react';
import LoginLayout, { LoginMessage } from '../components/LoginLayout';
import PasswordField from '../components/PasswordField';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const normalizedIdentifier = identifier.trim();
    if (!normalizedIdentifier || !password) {
      setError('Enter your email or user ID and password.');
      return;
    }

    if (normalizedIdentifier.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedIdentifier)) {
      setError('Enter a valid email address or user ID.');
      return;
    }

    setError('Login is unavailable because no authentication service is connected. No account has been signed in.');
  };

  return (
    <LoginLayout
      eyebrow="WELCOME BACK"
      title="Login to DreamNest"
      description="Continue designing your perfect home."
    >
      <LoginMessage>{error}</LoginMessage>
      <form onSubmit={handleSubmit}>
        <div className="login-field">
          <label htmlFor="login-email">Email address or user ID</label>
          <input
            id="login-email"
            name="identifier"
            type="text"
            placeholder="you@example.com"
            autoComplete="username"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            required
          />
        </div>

        <PasswordField
          id="login-password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button className="login-main-button" type="submit">
          <span>Login</span>
          <span>→</span>
        </button>
      </form>
    </LoginLayout>
  );
}

export default Login;
