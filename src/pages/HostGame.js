import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HostGame() {
  const navigate = useNavigate();

  const [sport, setSport] = useState('');
  const [playersNeeded, setPlayersNeeded] = useState('');
  const [hostName, setHostName] = useState('');
  const [venue, setVenue] = useState('');
  const [locationLink, setLocationLink] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [perHeadCost, setPerHeadCost] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (
      !sport ||
      !playersNeeded ||
      !hostName ||
      !venue ||
      !date ||
      !time ||
      !perHeadCost ||
      !totalAmount ||
      !contactNumber
    ) {
      setErrorMessage('Please fill all required fields');
      return;
    }

    try {
      const hostGameData = {
        sport,
        playersNeeded: Number(playersNeeded),
        hostName,
        venue,
        locationLink,
        date,
        time,
        perHeadCost: Number(perHeadCost),
        totalAmount: Number(totalAmount),
        contactNumber,
      };

      const token = localStorage.getItem('token');

      await axios.post(
        'https://squad-up-backend.vercel.app/api/games/host',
        hostGameData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Show success message
      setSuccessMessage('Game hosted successfully! Redirecting...');

      // ✅ Clear form
      setSport('');
      setPlayersNeeded('');
      setHostName('');
      setVenue('');
      setLocationLink('');
      setDate('');
      setTime('');
      setPerHeadCost('');
      setTotalAmount('');
      setContactNumber('');

      // ✅ Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      setErrorMessage(
        'Error hosting game: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Host a Game</h2>

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

      <form onSubmit={handleSubmit}>
        <label>Sport*</label><br />
        <select value={sport} onChange={e => setSport(e.target.value)} required>
          <option value="">Select sport</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Cricket">Cricket</option>
          <option value="Badminton">Badminton</option>
          <option value="Snooker">Snooker</option>
          <option value="Volleyball">Volleyball</option>
        </select><br /><br />

        <label>Number of Players Required*</label><br />
        <input
          type="number"
          value={playersNeeded}
          onChange={e => setPlayersNeeded(e.target.value)}
          min="1"
          required
        /><br /><br />

        <label>Host Name*</label><br />
        <input
          type="text"
          value={hostName}
          onChange={e => setHostName(e.target.value)}
          required
        /><br /><br />

        <label>Venue Name*</label><br />
        <input
          type="text"
          value={venue}
          onChange={e => setVenue(e.target.value)}
          required
        /><br /><br />

        <label>Location Link (Google Maps URL)</label><br />
        <input
          type="url"
          value={locationLink}
          onChange={e => setLocationLink(e.target.value)}
          placeholder="Optional"
        /><br /><br />

        <label>Date*</label><br />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        /><br /><br />

        <label>Time*</label><br />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
        /><br /><br />

        <label>Per Head Cost (₹)*</label><br />
        <input
          type="number"
          value={perHeadCost}
          onChange={e => setPerHeadCost(e.target.value)}
          min="0"
          required
        /><br /><br />

        <label>Total Amount (₹)*</label><br />
        <input
          type="number"
          value={totalAmount}
          onChange={e => setTotalAmount(e.target.value)}
          min="0"
          required
        /><br /><br />

        <label>Host Contact Number*</label><br />
        <input
          type="tel"
          value={contactNumber}
          onChange={e => setContactNumber(e.target.value)}
          required
        /><br /><br />

        <button type="submit" style={{ padding: 10, width: '100%' }}>
          Host Game
        </button>
      </form>
    </div>
  );
}

export default HostGame;