import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Dashboard</h2>

      <button
        style={{ padding: 10, marginBottom: 10, width: '100%' }}
        onClick={() => navigate('/host-game')}
      >
        Host Game
      </button>

      <button
        style={{ padding: 10, marginBottom: 10, width: '100%' }}
        onClick={() => navigate('/join')}
      >
        Join Game
      </button>

      <button
        style={{ padding: 10, marginBottom: 10, width: '100%' }}
        onClick={() => navigate('/my-hosted-games')}
      >
        My Hosted Games
      </button>

      <button
        style={{ padding: 10, marginBottom: 10, width: '100%' }}
        onClick={() => navigate('/my-joined-games')}
      >
        My Joined Games
      </button>

      <button
        style={{ padding: 10, marginTop: 20, width: '100%', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
