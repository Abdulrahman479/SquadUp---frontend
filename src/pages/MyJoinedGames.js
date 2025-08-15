import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function MyJoinedGames() {
  const [joinedGames, setJoinedGames] = useState([]);

  useEffect(() => {
    fetchJoinedGames();
  }, []);

  async function fetchJoinedGames() {
    try {
      const res = await axiosInstance.get('/games/joined');
      setJoinedGames(res.data);
    } catch (error) {
      alert('Failed to fetch your joined games: ' + (error.response?.data?.message || error.message));
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>My Joined Games</h2>
      {joinedGames.length === 0 ? (
        <p>You have not joined any games yet.</p>
      ) : (
        joinedGames.map(game => (
          <div key={game._id} style={{ border: '1px solid #ccc', padding: 15, marginBottom: 15 }}>
            <h3>{game.sport}</h3>
            <p><strong>Date:</strong> {game.date}</p>
            <p><strong>Time:</strong> {game.time}</p>
            <p><strong>Venue:</strong> {game.venue}</p>
            <p><strong>Host:</strong> {game.hostName} | <strong>Contact:</strong> {game.contactNumber}</p>
            <p><strong>Players Needed:</strong> {game.playersNeeded}</p>
            <p><strong>Per Player Cost:</strong> ₹{game.perHeadCost}</p>
            <p><strong>Total Cost:</strong> ₹{game.totalAmount}</p>

            <h4>Your Details:</h4>
            {/* Assuming backend returns your player details in the joinedGames array */}
            <p>Name: {game.joinedPlayer?.name}</p>
            <p>Contact: {game.joinedPlayer?.number}</p>
            <p>Age: {game.joinedPlayer?.age}</p>
            <p>Position: {game.joinedPlayer?.position || 'N/A'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyJoinedGames;
