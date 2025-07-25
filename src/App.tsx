import { useState } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState('');
  const [type, setType] = useState('trivia');
  const [fact, setFact] = useState('');
  const [error, setError] = useState('');

  const getFact = async () => {
    let url = 'http://numbersapi.com/';

    if (number) {
      if (isNaN(number)) {
        setError('Number must be a digit.');
        setFact('');
        return;
      }
      url += number + '/' + type;
    } else {
      url += 'random/' + type;
    }

    setError('');

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      setFact(data);
    } catch (error) {
      setError('Error fetching fact: ' + error.message);
      setFact('');
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (


    <div className="container">
      <h1>Number Facts</h1>
      <label htmlFor="number">Enter a number (optional):</label>
      <input
        type="number"
        id="number"
        name="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <label htmlFor="type">Select fact type:</label>
      <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="trivia">Trivia</option>
        <option value="math">Math</option>
        <option value="date">Date</option>
        <option value="year">Year</option>
      </select>

      <button onClick={getFact}>Get Fact</button>

      {error && <div className="error">{error}</div>}

      {fact && (
        <div className="result">
          <p>Number: {number || 'Random'}</p>
          <p>Type: {type}</p>
          <p>Fact: {fact}</p>
        </div>
      )}
    </div>
  )
}

export default App
