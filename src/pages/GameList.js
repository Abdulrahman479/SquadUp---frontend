import { useState, useEffect } from "react";

function GamesList() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    age: '',
    position: ''
  });

  const token = localStorage.getItem("token"); // Assumes token is saved after login

  useEffect(() => {
    fetch("https://squad-up-backend.vercel.app/api/games")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => alert('Failed to fetch games'));
  }, []);

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Please login first to join a game.');
      return;
    }
    try {
      const response = await fetch("https://squad-up-backend.vercel.app/api/games/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ gameId: selectedGame._id, ...formData })
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to join the game.");
        return;
      }

      alert(result.message || "Joined successfully!");
      setSelectedGame(null);
      setFormData({ name: '', number: '', age: '', position: '' });
    } catch (error) {
      alert('Error joining the game. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Available Games</h1>
      {games.map(game => (
        <div key={game._id} className="border rounded p-4 mb-4 shadow">
          <p><strong>Sport:</strong> {game.sport}</p>
          <p><strong>Date:</strong> {game.date}</p>
          <p><strong>Time:</strong> {game.time}</p>
          <button
            onClick={() => setSelectedGame(game)}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Join Now
          </button>
        </div>
      ))}

      {selectedGame && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Join {selectedGame.sport}</h2>
          <form onSubmit={handleJoinSubmit} className="space-y-2">
            <input
              className="w-full p-2 border rounded"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded"
              type="text"
              placeholder="Mobile Number"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded"
              type="text"
              placeholder="Position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              onClick={() => setSelectedGame(null)}
              className="ml-4 text-red-500 underline"
              type="button"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default GamesList;
