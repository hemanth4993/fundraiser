// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [donations, setDonations] = useState([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Fetch donations when the component mounts
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/donations');
            const data = await response.json();
            setDonations(data);
        } catch (error) {
            console.error('Error fetching donations:', error);
        }
    };

    const handleDonate = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: parseFloat(amount), description }),
            });

            if (response.ok) {
                setDonations([...donations, await response.json()]);
                setAmount('');
                setDescription('');
            } else {
                console.error('Error donating:', response.statusText);
            }
        } catch (error) {
            console.error('Error donating:', error);
        }
    };

    return (
        <div className="App">
            <h1>MERN Fundraising App</h1>
            <div>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <br />
                <button onClick={handleDonate}>Donate</button>
            </div>
            <div>
                <h2>Donations:</h2>
                <ul>
                    {donations.map((donation) => (
                        <li key={donation._id}>
                            Amount: {donation.amount}, Description: {donation.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
