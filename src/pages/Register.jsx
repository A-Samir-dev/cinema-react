import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getError } from '../api';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password (8+ characters)" value={form.password} onChange={handleChange} required />
      <input name="password_confirmation" type="password" placeholder="Confirm password" value={form.password_confirmation} onChange={handleChange} required />

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Create account'}
      </button>

      <p className="meta">
        عندك حساب؟ <Link to="/login" className="link">سجّل دخول</Link>
      </p>
    </form>
  );
}