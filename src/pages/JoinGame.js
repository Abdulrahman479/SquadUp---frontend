import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const sportsList = [
  'All', 'Football', 'Cricket', 'Badminton',
  'Volleyball', 'Snooker', 'Basketball'
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
    } catch {
      toast.error('Failed to fetch games');
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

    if (!playerName || !playerNumber || !playerAge) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const res = await axiosInstance.post('/games/register', {
        gameId: registeringGameId,
        name: playerName,
        number: playerNumber,
        age: playerAge,
        position: playerPosition,
      });

      if (res.status === 200) {
        toast.success('Joined successfully!');

        closeRegisterModal();
        fetchGames();

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Join a Game</h2>

      <label>Filter by Sport:</label>
      <select value={selectedSport} onChange={e => setSelectedSport(e.target.value)}>
        {sportsList.map(s => <option key={s}>{s}</option>)}
      </select>

      {filteredGames.map(game => (
        <div key={game._id} style={{ border: '1px solid #ccc', padding: 15, marginBottom: 15 }}>
          <h3>{game.sport}</h3>
          <p>{game.date} | {game.time}</p>
          <p>{game.venue}</p>

          <button
            disabled={(game.playersJoined?.length || 0) >= game.playersNeeded}
            onClick={() => openRegisterModal(game._id)}
          >
            Register
          </button>
        </div>
      ))}

      {showRegister && (
        <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center' }}>
          <div style={{ background:'white', padding:20 }}>
            <form onSubmit={handleRegister}>
              <input placeholder="Name" value={playerName} onChange={e => setPlayerName(e.target.value)} required />
              <input placeholder="Number" value={playerNumber} onChange={e => setPlayerNumber(e.target.value)} required />
              <input placeholder="Age" value={playerAge} onChange={e => setPlayerAge(e.target.value)} required />
              <button type="submit">Register</button>
            </form>
            <button onClick={closeRegisterModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinGame;