import React, {useEffect, useState} from 'react';
import '../style/App.css';
import {ListingComponent} from "./ListingComponent";
import {DummyPokemon} from "../types";
import {Button} from "react-bootstrap";

export function ListComponent(props: {
  asGrid: boolean
}) {
  const asGrid = props.asGrid
  const liste = [1,2,3,4,5,6,7,8]
  const dummyData: DummyPokemon[] = []
  const [showResults, setShowResults] = useState<boolean>(false)

  function makeDummyData() {

    liste.map((n) => {
      const dataPoint: DummyPokemon = {
        id: n,
        pokedexNr: n,
        type: "fire",
        generation: n,
        name: `Pokemon ${n}`
      }
      dummyData.push(dataPoint)
    })
  }

  useEffect(() => {
    console.log(dummyData)
  })

  let showListing = dummyData.map((pok, i) => (
    <ListingComponent key={i}
                      asGrid={asGrid}
                      pokemon={pok}/>
  ))

  return (
      <div>
        <Button onClick={() => setShowResults(!showResults)}>Vis Resultater</Button>
        {showResults ? showListing : null}
      </div>
  )
}