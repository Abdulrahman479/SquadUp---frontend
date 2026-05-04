import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const sportsList = [
  'All',
  'Football',
  'Cricket',
  'Badminton',
  'Volleyball',
  'Snooker',
  'Basketball'
];

function JoinGame() {
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedSport, setSelectedSport] = useState('All');

  const [showRegister, setShowRegister] = useState(false);
  const [registeringGameId, setRegisteringGameId] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (selectedSport === 'All') {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(game => game.sport === selectedSport));
    }
  }, [selectedSport, games]);

  async function fetchGames() {
    try {
      const res = await axiosInstance.get('/games');
      setGames(res.data);
    } catch (error) {
      setErrorMessage('Failed to fetch games');
    }
  }

  function openRegisterModal(gameId) {
    setRegisteringGameId(gameId);
    setPlayerName('');
    setPlayerNumber('');
    setPlayerAge('');
    setPlayerPosition('');
    setShowRegister(true);
  }

  function closeRegisterModal() {
    setShowRegister(false);
  }

  async function handleRegister(e) {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (!playerName || !playerNumber || !playerAge) {
      setErrorMessage('Please fill all required fields');
      return;
    }

    try {
      const registrationData = {
        gameId: registeringGameId,
        name: playerName,
        number: playerNumber,
        age: playerAge,
        position: playerPosition,
      };

      const res = await axiosInstance.post('/games/register', registrationData);

      if (res.status === 200) {
        setSuccessMessage('Joined successfully! Redirecting...');

        closeRegisterModal();

        // Optional: refresh games before leaving
        fetchGames();

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);

      } else {
        setErrorMessage('Registration failed');
      }

    } catch (error) {
      setErrorMessage(
        'Error: ' + (error.response?.data?.message || error.message)
      );
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Join a Game</h2>

      {/* ✅ Success Message */}
      {successMessage && (
        <div style={{ background: '#d4edda', color: '#155724', padding: 10, marginBottom: 15 }}>
          {successMessage}
        </div>
      )}

      {/* ❌ Error Message */}
      {errorMessage && (
        <div style={{ background: '#f8d7da', color: '#721c24', padding: 10, marginBottom: 15 }}>
          {errorMessage}
        </div>
      )}

      <label>Filter by Sport:</label>
      <select
        value={selectedSport}
        onChange={e => setSelectedSport(e.target.value)}
        style={{ marginLeft: 10, marginBottom: 20 }}
      >
        {sportsList.map(sport => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>

      {filteredGames.length === 0 ? (
        <p>No games available for this sport.</p>
      ) : (
        filteredGames.map(game => (
          <div key={game._id} style={{ border: '1px solid #ccc', padding: 15, marginBottom: 15 }}>
            <h3>{game.sport}</h3>
            <p><strong>Date:</strong> {game.date}</p>
            <p><strong>Time:</strong> {game.time}</p>
            <p><strong>Venue:</strong> {game.venue}</p>

            {game.locationLink && (
              <p>
                <strong>Location: </strong>
                <a href={game.locationLink} target="_blank" rel="noopener noreferrer">
                  View on map
                </a>
              </p>
            )}

            <p><strong>Host:</strong> {game.hostName} | <strong>Contact:</strong> {game.contactNumber}</p>
            <p>
              <strong>Players Joined:</strong> {game.playersJoined?.length || 0} / {game.playersNeeded}
            </p>
            <p><strong>Per Head Cost:</strong> ₹{game.perHeadCost}</p>
            <p><strong>Total Amount:</strong> ₹{game.totalAmount}</p>

            <button
              disabled={(game.playersJoined?.length || 0) >= game.playersNeeded}
              onClick={() => openRegisterModal(game._id)}
              style={{ padding: 10 }}
            >
              {(game.playersJoined?.length || 0) >= game.playersNeeded ? 'Full' : 'Register'}
            </button>
          </div>
        ))
      )}

      {showRegister && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 5, width: 400 }}>
            <h3>Register for Game</h3>

            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Name"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                required
                style={{ width: '100%', marginBottom: 10 }}
              />

              <input
                type="tel"
                placeholder="Contact Number"
                value={playerNumber}
                onChange={e => setPlayerNumber(e.target.value)}
                required
                style={{ width: '100%', marginBottom: 10 }}
              />

              <input
                type="number"
                placeholder="Age"
                value={playerAge}
                onChange={e => setPlayerAge(e.target.value)}
                required
                style={{ width: '100%', marginBottom: 10 }}
              />

              <input
                type="text"
                placeholder="Position (Optional)"
                value={playerPosition}
                onChange={e => setPlayerPosition(e.target.value)}
                style={{ width: '100%', marginBottom: 10 }}
              />

              <button type="submit" style={{ padding: 10, width: '100%' }}>
                Register
              </button>
            </form>

            <button onClick={closeRegisterModal} style={{ marginTop: 10 }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinGame;