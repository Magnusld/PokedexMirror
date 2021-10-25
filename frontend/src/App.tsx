import React, {useEffect, useState} from 'react';
import './style/App.css';
import {TopBar} from "./components/TopBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GenOptionsComponent} from "./components/GenOptionsComponent";
import {TypeOptionComponent} from "./components/TypeOptionComponent";
import {ListComponent} from "./components/ListComponent";
//import {Generation} from "./types";
import Info from './pages/Info';

function App() {
  const [asGrid, setAsGrid] = useState<boolean>(true)
  const [showGenSelection, setShowGenSelection] = useState<boolean>(false)
  const [showTypeSelection, setShowTypeSelection] = useState<boolean>(false)


  return (
    <div className="App">
      <TopBar asGrid={asGrid}
              setAsGrid={setAsGrid}
              setShowGenSelection={setShowGenSelection}
              showGenSelection={showGenSelection}
              setShowTypeSelection={setShowTypeSelection}
              showTypeSelection={showTypeSelection}/>
      <div style={{paddingTop: "15vh"}}>
        <div className="optionsContainer">
          {showGenSelection ? <GenOptionsComponent /> : null}
          {showTypeSelection ? <TypeOptionComponent /> : null}
        </div>
        <div className={"list"}>
          <ListComponent asGrid={asGrid}></ListComponent>
        </div>
      </div>
    </div>
  );
}

export default App;
