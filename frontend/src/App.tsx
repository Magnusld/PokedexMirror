import React, {useEffect, useState} from 'react';
import './style/App.css';
import {TopBar} from "./components/TopBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GenOptionsComponent} from "./components/GenOptionsComponent";

function App() {
  const [asGrid, setAsGrid] = useState<boolean>(true)
  const [showGenSelection, setShowGenSelection] = useState<boolean>(false)

  return (
    <div className="App">
      <TopBar asGrid={asGrid}
              setAsGrid={setAsGrid}
              setShowGenSelection={setShowGenSelection}
              showGenSelection={showGenSelection}/>
      {showGenSelection ? <GenOptionsComponent /> : null}
    </div>
  );
}

export default App;
