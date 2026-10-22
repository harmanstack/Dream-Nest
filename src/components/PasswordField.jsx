import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder = 'Enter your password',
  autoComplete = 'current-password',
  minLength,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="login-field">
      <label htmlFor={id}>{label}</label>
      <div className="login-password-control">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          required
        />
        <button
          className="login-password-toggle"
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
