import Button from "./Button";
import React from 'react';

export default function History(props) {
  const onBack = props.onBack;

  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch("http://localhost:3001/history");
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    }
    fetchHistory();
  }, [])

    /**
   * Deletes a record from backend and updates state
   * @param {string} id
   */
  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:3001/history/${id}`, {
        method: "DELETE"
      })

      // Updates UI immediately
      setHistory(prev => prev.filter(record => record.id !== id));
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  }

  return (
    <div>
      <h2>HISTORY</h2>
      <div className="history-back">
        <Button text="Back" onClick={onBack} />
      </div>      
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Numbers</th>
            <th>Powerball</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {history.map(record => (
            <tr key={record.id}>
              <td>{new Date(record.date_generated).toLocaleString()}</td>
              <td>{record.lottery_numbers.join(", ")}</td>
              <td style={{ color: "red", fontWeight: "normal" }}>{record.power_ball}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(record.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}