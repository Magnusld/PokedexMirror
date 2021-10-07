import React from 'react';
import '../style/App.css';
import {Accordion, Button, Dropdown, Form} from "react-bootstrap";
import {ReactComponent as List } from '../assets/list_black_24dp.svg'
import {ReactComponent as Grid } from '../assets/apps_black_24dp.svg';

export function TopBar(props: {
  selectedGens: number[]
  setSelectedGens: (gens: number[]) => void
}) {
  const searchText = ""
  const selectedGens = props.selectedGens


  return (
      <div className={"topbar"}>
        <div>
          <input className={"search"} style={{width: 300}} placeholder={"Søk"}/>
        </div>
        <div>
          <Button variant="outline-dark" style={{marginRight:5}}>Velg Generasjon</Button>
          <Button variant="outline-dark">Velg Type</Button>
        </div>
        <div>
          <List style={{height: 35, width: 35}}/>
          <Grid style={{height: 35, width: 35}}/>
        </div>
          
      </div>
  );
}