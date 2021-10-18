import React, {useEffect, useState} from 'react';
import '../style/App.css';
import {DummyPokemon} from "../types";

export function ListingComponent(props: {
  asGrid: boolean
  pokemon: DummyPokemon
}) {
  const pokemon = props.pokemon

  useEffect(() => {
    console.log("Im alive")
  })

  return (
      <div className={"listing"}>
        <h3>{pokemon.name}</h3>
      </div>
  )
}