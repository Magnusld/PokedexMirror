import React, { useEffect, useState } from 'react';
import '../style/App.css';
import {Accordion, Button, Dropdown, Form} from "react-bootstrap";
import {ReactComponent as List } from '../assets/list_black_24dp.svg'
import {ReactComponent as Grid } from '../assets/apps_black_24dp.svg';
import {ReactComponent as Search} from "../assets/search_black_24dp.svg";
import { useDispatch } from 'react-redux';
import { addInput } from '../redux/searchSlice';
import useWindowDimensions from '../hooks/useWindowDimensions';

export function TopBar(props: {
  asGrid: boolean
  setAsGrid: (value: boolean) => void
  setShowGenSelection: (value: boolean) => void
  showGenSelection: boolean
  setShowTypeSelection: (value: boolean) => void
  showTypeSelection: boolean
  showSorting: boolean
  setShowSorting: (value: boolean) => void

}) {

  const dispatch = useDispatch()
  const { width } = useWindowDimensions();

  const searchText = ""
  const asGrid = props.asGrid
  const showGenSelection = props.showGenSelection
  const showTypeSelection = props.showTypeSelection
  const showSorting = props.showSorting

  const swapAsGrid = () => {
    props.setAsGrid(!asGrid)
  }

  /**
   * Adds change on search input to searchSlice state
   * @param event 
   */
  function handleChange(event: { target: { value: string }}) {
    dispatch(addInput(event.target.value))
  }

  useEffect(() => {
    if(width <= 700) {
      props.setAsGrid(false)
    }
  }, [width]) 

  /**
   * Toggles the advanced settings menu
   */
  function toggleAdvanced() {
    props.setShowGenSelection(!showGenSelection)
    props.setShowTypeSelection(!showTypeSelection)
    props.setShowSorting(!showSorting)
  }

  return (
    <nav>
      <div className={"topbar"}>
        <div>
          <input className={"search"} placeholder={"Søk"} onChange={handleChange} />
          <Search style={{height: 35, width: 35, fill: "#F5F5F5"}}/>
        </div>
        <div className="advanced">
          <Button variant="outline-light" onClick={toggleAdvanced}>Instillinger</Button>
        </div>
        <div className="list-grid-swap">
          <List style={{height: 35, width: 35}} className={asGrid ? "" : "active"} onClick={swapAsGrid}/>
          <Grid style={{height: 35, width: 35}} className={asGrid ? "active" : ""} onClick={swapAsGrid}/>
        </div>
      </div>
    </nav>
  );
}