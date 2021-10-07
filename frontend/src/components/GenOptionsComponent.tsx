import React from 'react';
import '../style/App.css';
import {Form} from "react-bootstrap";
import {Generation} from "../types";

export function GenOptionsComponent(props: {
  selectedGens: Generation[]
  setSelectedGens: (gens: Generation[]) => void
}) {
  const selectedGens = props.selectedGens
  const setSelectedGens = props.setSelectedGens

  return (
      <div>

      </div>
  )
}