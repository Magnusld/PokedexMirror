import React, {useState} from 'react';
import './style/App.css';
import {TopBar} from "./components/TopBar";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedGens, setSelectedGens] = useState<number[]>([1,2,3,4,5,6,7,8,9])

  return (
    <div className="App">
      <TopBar selectedGens={selectedGens} setSelectedGens={setSelectedGens}/>
    </div>
  );
}

export default App;
