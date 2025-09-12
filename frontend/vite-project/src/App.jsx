import './App.css'
import Header from './components/Header'
import NumberDisplay from './components/NumberDisplay'
import Button from './components/Button'
import History from './components/History'
import React from 'react'

// function App() {

//   const [mainDisplay, setMainDisplay] = React.useState("viewNumberDisplay");

//   function configureMainDisplay() {
//     setMainDisplay("viewHistory");
//   }

//   return (
//     <>
//       <Header />
//       <NumberDisplay />
//       <div className="button-div">
//         <Button text="Generate" />
//         <Button onClick={configureMainDisplay} text="View History"/>
//       </div>
//       <History />
//     </>
//   )
// }

// export default App

function App() {
  const [mainDisplay, setMainDisplay] = React.useState("viewNumberDisplay");

  return (
    <>
      <Header />

      {mainDisplay === "viewNumberDisplay" ? (
        <>
          <NumberDisplay />
          <div className="button-div">
            <Button text="Generate" />
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