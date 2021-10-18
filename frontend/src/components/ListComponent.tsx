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
  const dummyPokemon1: DummyPokemon = {
    id: 1,
    pokedexNr: 1,
    type: ["Grass", "Poison"],
    generation: 1,
    name: "Bulbasaur"
  }
  const dummyPokemon2: DummyPokemon = {
    id: 2,
    pokedexNr: 4,
    type: ["Fire"],
    generation: 1,
    name: "Charmander"
  }
  const dummyPokemon3: DummyPokemon = {
    id: 3,
    pokedexNr: 7,
    type: ["Water"],
    generation: 1,
    name: "Squirtle"
  }
  const dummyPokemon4: DummyPokemon = {
    id: 4,
    pokedexNr: 25,
    type: ["Electric"],
    generation: 1,
    name: "Pikachu"
  }
  const dummyData: DummyPokemon[] = [dummyPokemon1, dummyPokemon2, dummyPokemon3, dummyPokemon4]
  const [showResults, setShowResults] = useState<boolean>(false)


  useEffect(() => {
    console.log(dummyData)
    console.log(asGrid)
  })

  let showListing = dummyData.map((pok) => (
    <ListingComponent key={pok.id}
                      asGrid={asGrid}
                      pokemon={pok}/>
  ))

  function chooseClassName() {
    if (asGrid) {
      return "AsGrid"
    } else { return "AsList"}
  }

  return (
      <div>
        <div className={"listTopbar"}>
            viser {dummyData.length}/"hvor enn mange hele datasettet er"
        </div>
        <div className={"list"+chooseClassName()}>
          {showListing}
        </div>
      </div>
  )
}