import React, {useEffect, useState} from 'react';
import '../style/App.css';
import {DummyPokemon} from "../types";
import {ReactComponent as Bug} from "../assets/typeIconsSvg/Pokémon_Bug_Type_Icon.svg";
import {ReactComponent as Dark} from "../assets/typeIconsSvg/Pokémon_Dark_Type_Icon.svg";
import {ReactComponent as Dragon} from "../assets/typeIconsSvg/Pokémon_Dragon_Type_Icon.svg";
import {ReactComponent as Electric} from "../assets/typeIconsSvg/Pokémon_Electric_Type_Icon.svg";
import {ReactComponent as Fairy} from "../assets/typeIconsSvg/Pokémon_Fairy_Type_Icon.svg";
import {ReactComponent as Fighting} from "../assets/typeIconsSvg/Pokémon_Fighting_Type_Icon.svg";
import {ReactComponent as Fire} from "../assets/typeIconsSvg/Pokémon_Fire_Type_Icon.svg";
import {ReactComponent as Flying} from "../assets/typeIconsSvg/Pokémon_Flying_Type_Icon.svg";
import {ReactComponent as Ghost} from "../assets/typeIconsSvg/Pokémon_Ghost_Type_Icon.svg";
import {ReactComponent as Grass} from "../assets/typeIconsSvg/Pokémon_Grass_Type_Icon.svg";
import {ReactComponent as Ground} from "../assets/typeIconsSvg/Pokémon_Ground_Type_Icon.svg";
import {ReactComponent as Ice} from "../assets/typeIconsSvg/Pokémon_Ice_Type_Icon.svg";
import {ReactComponent as Normal} from "../assets/typeIconsSvg/Pokémon_Normal_Type_Icon.svg";
import {ReactComponent as Poison} from "../assets/typeIconsSvg/Pokémon_Poison_Type_Icon.svg";
import {ReactComponent as Psychic} from "../assets/typeIconsSvg/Pokémon_Psychic_Type_Icon.svg";
import {ReactComponent as Rock} from "../assets/typeIconsSvg/Pokémon_Rock_Type_Icon.svg";
import {ReactComponent as Steel} from "../assets/typeIconsSvg/Pokémon_Steel_Type_Icon.svg";
import {ReactComponent as Water} from "../assets/typeIconsSvg/Pokémon_Water_Type_Icon.svg";

export function ListingComponent(props: {
  asGrid: boolean
  pokemon: DummyPokemon
}) {
  const pokemon = props.pokemon

  useEffect(() => {
    console.log("Im alive")
  })

  let showTypeEmblem = pokemon.type.map((Type) => (
      <div>
        {Type == "Bug" ? <Bug className={"typeIcon"}/> : null}
        {Type == "Dark" ? <Dark className={"typeIcon"}/> : null}
        {Type == "Dragon" ? <Dragon className={"typeIcon"}/> : null}
        {Type == "Electric" ? <Electric className={"typeIcon"}/> : null}
        {Type == "Fairy" ? <Fairy className={"typeIcon"}/> : null}
        {Type == "Fighting" ? <Fighting className={"typeIcon"}/> : null}
        {Type == "Fire" ? <Fire className={"typeIcon"}/> : null}
        {Type == "Flying" ? <Flying className={"typeIcon"}/> : null}
        {Type == "Ghost" ? <Ghost className={"typeIcon"}/> : null}
        {Type == "Grass" ? <Grass className={"typeIcon"}/> : null}
        {Type == "Ground" ? <Ground className={"typeIcon"}/> : null}
        {Type == "Ice" ? <Ice className={"typeIcon"}/> : null}
        {Type == "Normal" ? <Normal className={"typeIcon"}/> : null}
        {Type == "Poison" ? <Poison className={"typeIcon"}/> : null}
        {Type == "Psychic" ? <Psychic className={"typeIcon"}/> : null}
        {Type == "Rock" ? <Rock className={"typeIcon"}/> : null}
        {Type == "Steel" ? <Steel className={"typeIcon"}/> : null}
        {Type == "Water" ? <Water className={"typeIcon"}/> : null}
      </div>
  ))

  return (
      <div className={"listingAsList"}>
        <div className={"pokedexNumberAsList"}>
          <h3>{pokemon.pokedexNr}:</h3>
        </div>
        <div className={"listingInfoAsList"}>
          <div>
            <h5>{pokemon.name}</h5>
          </div>
          <p>Gen: {pokemon.generation} Type: {pokemon.type.toString()}</p>
        </div>
        <div className={"typeEmblemAsList"}>
          {showTypeEmblem}
        </div>
      </div>
  )
}