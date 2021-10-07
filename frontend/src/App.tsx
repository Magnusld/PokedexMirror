import React, {useEffect, useState} from 'react';
import './style/App.css';
import {TopBar} from "./components/TopBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GenOptionsComponent} from "./components/GenOptionsComponent";
import {Generation} from "./types";



function App() {
  const [selectedGens, setSelectedGens] = useState<Generation[]>([])
  const [asGrid, setAsGrid] = useState<boolean>(true)
  const [showGenSelection, setShowGenSelection] = useState<boolean>(false)

  useEffect(() => {
    let list = [1,2,3,4,5,6,7,8]
    let GenList: Generation[] = []
    list.map((gen, i) => {
      const newGen: Generation = {
        selected: true,
        name: "Gen " + gen
      }
      GenList.push(newGen)
    })
    setSelectedGens(GenList)
    console.log(selectedGens)
  }, []);

  return (
    <div className="App">
      <TopBar asGrid={asGrid}
              setAsGrid={setAsGrid}
              setShowGenSelection={setShowGenSelection}
              showGenSelection={showGenSelection}/>
      {showGenSelection ? <GenOptionsComponent selectedGens={selectedGens}
                           setSelectedGens={setSelectedGens}/> : null}
    </div>
  );
}

export default App;
