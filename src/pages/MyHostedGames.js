import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function MyHostedGames() {
  const [hostedGames, setHostedGames] = useState([]);

  useEffect(() => {
    fetchHostedGames();
  }, []);

async function fetchHostedGames() {
  try {
    const token = localStorage.getItem('token'); // Or get it from your auth context

    const res = await axiosInstance.get('https://squad-up-backend.vercel.app/api/games/hosted', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setHostedGames(res.data);
  } catch (error) {
    alert('Failed to fetch your hosted games: ' + (error.response?.data?.message || error.message));
  }
}


  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>My Hosted Games</h2>
      {hostedGames.length === 0 ? (
        <p>You have not hosted any games yet.</p>
      ) : (
        hostedGames.map(game => (
          <div key={game._id} style={{ border: '1px solid #ccc', padding: 15, marginBottom: 15 }}>
            <h3>{game.sport}</h3>
            <p><strong>Date:</strong> {game.date}</p>
            <p><strong>Time:</strong> {game.time}</p>
            <p><strong>Venue:</strong> {game.venue}</p>
            <p><strong>Host Contact:</strong> {game.contactNumber}</p>
            <p><strong>Players Joined:</strong> {game.playersJoined?.length || 0} / {game.playersNeeded}</p>
            <p><strong>Per Player Cost:</strong> ₹{game.perHeadCost}</p>
            <p><strong>Total Cost:</strong> ₹{game.totalAmount}</p>

            <h4>Players Registered:</h4>
            {game.playersJoined && game.playersJoined.length > 0 ? (
              <ul>
                {game.playersJoined.map(player => (
                  <li key={player._id}>
                    {player.name} | Contact: {player.number} | Age: {player.age} | Position: {player.position || 'N/A'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No players joined yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyHostedGames;
