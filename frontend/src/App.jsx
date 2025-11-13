import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when component loads
  useEffect(() => {
    axios.get('http://localhost:8080/api/sensor-data')
      .then(response => {
        setReadings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); // Empty array = run once on mount

  if (loading) {
    return <div>Loading sensor data...</div>;
  }

  return (
    <div className="App">
      <h1>FactoryWatch Dashboard</h1>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Device</th>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {readings.map(reading => (
            <tr key={reading.id}>
              <td>{reading.id}</td>
              <td>{reading.deviceId}</td>
              <td>{reading.temperature}</td>
              <td>{reading.humidity}</td>
              <td>{new Date(reading.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;