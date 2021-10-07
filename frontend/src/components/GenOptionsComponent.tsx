import React from 'react';
import '../style/App.css';
import {Button, Form} from "react-bootstrap";
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

  let showGenSelection = selectedGens.map((gen, i) => (
      <Button key={i} onClick={() => {updateSeletedGens(i+1)}}>{gen.name}</Button>
  ));

  return (
      <div className={"showGenSelection"}>
        {showGenSelection}
      </div>
  )
}