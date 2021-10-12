import React, {useState} from 'react';
import '../style/App.css';
import {Button, Form, ToggleButton} from "react-bootstrap";

export function GenOptionsComponent() {

  const [checked, setChecked] = useState(false) // Temp variabel

  return (
      <div style={{display: "flex", justifyContent: "center"}}>
        <div className={"filteringOptionsContainer"}>
          <div>
            <h3 style={{textAlign: "left"}}>Generasjon</h3>
          </div>
          <div className={"optionsButtonsContainer"} style={{flexGrow: 1}}>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>Gen 1</ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>Gen 2</ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>Gen 3</ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>Gen 4</ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>Gen 5</ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>Gen 6</ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>Gen 7</ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>Gen 8</ToggleButton>
          </div>
        </div>
      </div>
  )
}