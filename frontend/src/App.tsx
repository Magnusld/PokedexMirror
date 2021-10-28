import React, {useEffect, useState} from 'react';
import './style/App.css';
import {TopBar} from "./components/TopBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GenOptionsComponent} from "./components/GenOptionsComponent";
import {TypeOptionComponent} from "./components/TypeOptionComponent";
import {ListComponent} from "./components/ListComponent";
//import {Generation} from "./types";
import Info from './pages/Info';
import { SortOptions } from './components/SortOptions';

function App() {
  const [asGrid, setAsGrid] = useState<boolean>(true)
  const [showGenSelection, setShowGenSelection] = useState<boolean>(false)
  const [showTypeSelection, setShowTypeSelection] = useState<boolean>(false)
  const [showSorting, setShowSorting] = useState<boolean>(false)




  return (
    <div className="App">
      <TopBar asGrid={asGrid}
              setAsGrid={setAsGrid}
              setShowGenSelection={setShowGenSelection}
              showGenSelection={showGenSelection}
              setShowTypeSelection={setShowTypeSelection}
              showTypeSelection={showTypeSelection}
              showSorting={showSorting}
              setShowSorting={setShowSorting}
              />
      <div className="optionsContainer">
        {showSorting ? <SortOptions /> : null}
        {showGenSelection ? <GenOptionsComponent /> : null}
        {showTypeSelection ? <TypeOptionComponent /> : null}
      </div>
      <div className={"list"}>
        <ListComponent asGrid={asGrid}></ListComponent>
      </div>
    </div>
  );
}

export default App;
