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

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  const [asGrid, setAsGrid] = useState<boolean>(true)
  const [showGenSelection, setShowGenSelection] = useState<boolean>(false)
  const [showTypeSelection, setShowTypeSelection] = useState<boolean>(false)
  const [showSorting, setShowSorting] = useState<boolean>(false)

  return (
    <Router>
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
        <div style={{paddingTop: "15vh"}}>
          <div className="optionsContainer">
            {showSorting ? <SortOptions/> : null}
            {showGenSelection ? <GenOptionsComponent/> : null}
            {showTypeSelection ? <TypeOptionComponent/> : null}
          </div>
          <Switch>
            <Route exact path="/">
              <div className={"list"}>
                <ListComponent asGrid={asGrid}/>
              </div>
            </Route>
            <Route path="/info/:id">
              <Info/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
