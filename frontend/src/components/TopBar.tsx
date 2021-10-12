import React from 'react';
import '../style/App.css';
import {Accordion, Button, Dropdown, Form} from "react-bootstrap";
import {ReactComponent as List } from '../assets/list_black_24dp.svg'
import {ReactComponent as Grid } from '../assets/apps_black_24dp.svg';
import {ReactComponent as Search} from "../assets/search_black_24dp.svg";

export function TopBar(props: {
  asGrid: boolean
  setAsGrid: (value: boolean) => void
  setShowGenSelection: (value: boolean) => void
  showGenSelection: boolean
  setShowTypeSelection: (value: boolean) => void
  showTypeSelection: boolean

}) {
  const searchText = ""
  const asGrid = props.asGrid
  const showGenSelection = props.showGenSelection
  const showTypeSelection = props.showTypeSelection

  const swapAsGrid = () => {
    props.setAsGrid(!asGrid)
  }
  const swapShowGenSelection = () => {
    props.setShowGenSelection(!showGenSelection)
  }
  const swapShowTypeSelection = () => {
    props.setShowTypeSelection(!showTypeSelection)
  }


  return (
      <div className={"topbar"}>
        <div>
          <input className={"search"} style={{width: 300}} placeholder={"Søk"}/>
          <Search style={{height: 35, width: 35, fill: "#F5F5F5"}}/>
        </div>
        <div>
          <Button variant="outline-light" style={{marginRight:5}} onClick={swapShowGenSelection}>Velg Generasjon</Button>
          <Button variant="outline-light" onClick={swapShowTypeSelection}>Velg Type</Button>
        </div>
        <div>
          <List style={{height: 35, width: 35}} className={asGrid ? "" : "active"} onClick={swapAsGrid}/>
          <Grid style={{height: 35, width: 35}} className={asGrid ? "active" : ""} onClick={swapAsGrid}/>
        </div>
      </div>
  );
}