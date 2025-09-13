import './App.css'
import Header from './components/Header'
import NumberDisplay from './components/NumberDisplay'
import Button from './components/Button'
import History from './components/History'
import React from 'react'

function App() {
  const [mainDisplay, setMainDisplay] = React.useState("viewNumberDisplay");

  const [numbers, setNumbers] = React.useState([]);

  async function handleGenerate() {
    try {
      const response = await fetch('http://localhost:3001/generate');
      const data = await response.json();
      setNumbers(data);
    } catch (err) {
      console.error('Error fetching numbers:', err);
    }
  }

  return (
    <>
      <Header />

      {mainDisplay === "viewNumberDisplay" ? (
        <>
          <NumberDisplay 
            numbers={numbers}
          />
          <div className="button-div">
            <Button
              onClick={handleGenerate} 
              text="Generate" 
            />
            <Button
              text="View History"
              onClick={() => setMainDisplay("viewHistory")}
            />
          </div>
        </>
      ) : (
        <History onBack={() => setMainDisplay("viewNumberDisplay")} />
      )}
    </>
  );
}

export default App;