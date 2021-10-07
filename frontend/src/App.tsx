import React, {useState} from 'react';
import './style/App.css';
import {TopBar} from "./components/TopBar";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedGens, setSelectedGens] = useState<number[]>([1,2,3,4,5,6,7,8,9])
  const [asGrid, setAsGrid] = useState<boolean>(true)

  return (
    <div className="App">
      <TopBar selectedGens={selectedGens}
              setSelectedGens={setSelectedGens}
              asGrid={asGrid}
              setAsGrid={setAsGrid}/>
    </div>
  );
}

export default App;
