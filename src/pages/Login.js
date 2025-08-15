import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted:', { email, password });  // Debug log

    try {
      const res = await axios.post('https://squad-up-backend.vercel.app/api/auth/login', { email, password });
      console.log('Login response:', res.data); // Debug log
      login(res.data.token); // Save token in context
      navigate('/dashboard'); // Redirect after login
    } catch (error) {
      console.error('Login failed:', error); // Debug log
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: 10, width: '100%' }}>Login</button>
      </form>
      <p style={{ marginTop: 10 }}>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
}

export default Login;
