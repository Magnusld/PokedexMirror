import React, {useState} from 'react';
import '../style/App.css';
import {Button, Form, ToggleButton} from "react-bootstrap";
import {RootState} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setAllGensFalse, swapSelectedGen} from "../redux/generationSlice";

export function GenOptionsComponent() {
  const [checked, setChecked] = useState(false)
  const selectedGen = useSelector((state: RootState) => state.selectedGen.value)
  const dispatch = useDispatch()

  const handleButtonClick = (id: number) => {
    dispatch(swapSelectedGen(id))
    //console.log(selectedGen)
  }

  let showToggleButtons = selectedGen.map((gen, i) => (
      <ToggleButton key = {gen.id}
                    className="mb-2"
                    type="checkbox" value="1"
                    checked={gen.selected}
                    variant="outline-primary"
                    id="toggle-check"
                    onClick={() => handleButtonClick(i)}>{gen.name}</ToggleButton>
  ))

  return (
      <div style={{display: "flex", justifyContent: "center"}}>
        <div className={"filteringOptionsContainer"}>
          <div>
            <h3 style={{textAlign: "left", marginTop: 10}}>Generasjon</h3>
          </div>
          <div className={"optionsButtonsContainer"} style={{flexGrow: 1}}>
            {showToggleButtons}
          </div>
          <Button className="clearAllButton" variant="secondary"
                  onClick={() => dispatch(setAllGensFalse())}>Fjerne alle valg</Button>
        </div>
      </div>
  )
}

/*
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

 */