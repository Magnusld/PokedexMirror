import React, {useEffect, useState} from 'react';
import './style/App.css';
import {TopBar} from "./components/TopBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GenOptionsComponent} from "./components/GenOptionsComponent";
import {TypeOptionComponent} from "./components/TypeOptionComponent";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {setAllTrue} from "./redux/generationSlice";

function App() {
  const [asGrid, setAsGrid] = useState<boolean>(true)
  const [showGenSelection, setShowGenSelection] = useState<boolean>(false)
  const [showTypeSelection, setShowTypeSelection] = useState<boolean>(false)
  const selectedGen = useSelector((state: RootState) => state.selectedGen.value)
  const dispatch = useDispatch()


  return (
    <div className="App">
      <TopBar asGrid={asGrid}
              setAsGrid={setAsGrid}
              setShowGenSelection={setShowGenSelection}
              showGenSelection={showGenSelection}
              setShowTypeSelection={setShowTypeSelection}
              showTypeSelection={showTypeSelection}/>
      {showGenSelection ? <GenOptionsComponent /> : null}
      {showTypeSelection ? <TypeOptionComponent /> : null}
    </div>
  );
}

export default App;
