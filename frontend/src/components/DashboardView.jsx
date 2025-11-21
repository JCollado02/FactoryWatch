const StatusBadge = ({ status }) => {
  const labels = {
    normal: 'Normal',
    warning: 'Warning',
    critical: 'Critical'
  };

  return (
    <span className={`status-badge status-${status}`}>
      {labels[status]}
    </span>
  );
};

function DashboardView({ stats, deviceReadings, getStatus }) {
  return (
    <div className="App">
      <h1>FactoryWatch Dashboard</h1>
      <p className="subtitle">Real-Time Industrial Sensor Monitoring</p>
      
      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-label">Average Temperature</div>
          <div className="stat-value">{stats.avgTemp}°C</div>
          <div className="stat-subtitle">Across all sensors</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Average Humidity</div>
          <div className="stat-value">{stats.avgHumidity}%</div>
          <div className="stat-subtitle">Across all sensors</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Active Devices</div>
          <div className="stat-value">{stats.uniqueDevices}</div>
          <div className="stat-subtitle">{stats.totalReadings} total readings</div>
        </div>
      </div>

      {/* Table Header */}
      <div className="table-header">
        <h3>Live Sensor Readings</h3>
        
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Device</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Timestamp</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deviceReadings.map(reading => (
            <tr key={reading.deviceId}>
              <td className="device-cell">{reading.deviceId}</td>
              <td>
                <div className="temp-cell">
                  <span className={`temp-dot temp-${getStatus(reading.temperature)}`}></span>
                  {reading.temperature}°C
                </div>
              </td>
              <td>{reading.humidity}%</td>
              <td className="timestamp-cell">{new Date(reading.timestamp).toLocaleString()}</td>
              <td>
                <StatusBadge status={getStatus(reading.temperature)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardView;