import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      toast.error('Please fill all required fields');
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

      toast.success('Game hosted successfully!');

      // Clear form
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

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Error hosting game'
      );
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Host a Game</h2>

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

        <input type="number" placeholder="Players Needed" value={playersNeeded} onChange={e => setPlayersNeeded(e.target.value)} required /><br /><br />
        <input type="text" placeholder="Host Name" value={hostName} onChange={e => setHostName(e.target.value)} required /><br /><br />
        <input type="text" placeholder="Venue" value={venue} onChange={e => setVenue(e.target.value)} required /><br /><br />
        <input type="url" placeholder="Location Link (Optional)" value={locationLink} onChange={e => setLocationLink(e.target.value)} /><br /><br />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required /><br /><br />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} required /><br /><br />
        <input type="number" placeholder="Per Head Cost" value={perHeadCost} onChange={e => setPerHeadCost(e.target.value)} required /><br /><br />
        <input type="number" placeholder="Total Amount" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} required /><br /><br />
        <input type="tel" placeholder="Contact Number" value={contactNumber} onChange={e => setContactNumber(e.target.value)} required /><br /><br />

        <button type="submit" style={{ padding: 10, width: '100%' }}>
          Host Game
        </button>
      </form>
    </div>
  );
}

export default HostGame;