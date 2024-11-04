import React, { useState } from 'react';
    import { useUser } from '../contexts/UserContext';
    import { useNavigate } from 'react-router-dom';

    const LoginForm: React.FC = () => {
      const { login } = useUser();
      const navigate = useNavigate();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
          navigate('/dashboard');
        } else {
          setError('Invalid email or password');
        }
      };

      return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
      );
    };

    export default LoginForm;
