import React, {useState} from 'react';
import '../style/App.css';
import {Button, Form, ToggleButton} from "react-bootstrap";
import {Generation} from "../types";

export function GenOptionsComponent(props: {
  selectedGens: Generation[]
  setSelectedGens: (gens: Generation[]) => void
}) {
  const selectedGens = props.selectedGens
  const updateSeletedGens = (index: number) => {
    selectedGens[index].selected = !selectedGens[index].selected
    props.setSelectedGens(selectedGens)
    console.log(selectedGens)
  }
  const [checked, setChecked] = useState(false)

  /*
  let showGenSelection = selectedGens.map((gen, i) => (
      <Button key={i} onClick={() => {updateSeletedGens(i+1)}}>{gen.name}</Button>
  ));
   */

  return (
      <div className={"showGenSelection"}>
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
  )
}