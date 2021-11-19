import React, {useEffect, useState} from 'react';
import '../style/App.css';
import {PokemonSimple} from "../types";
import {getFullSize, getSprite, getThumbnail} from "../util/imageResolver";
import { Link } from 'react-router-dom';
import { typeListToEmblems } from '../util/helperFunctions';

export function ListingComponent(props: {
  asGrid: boolean
  pokemon: PokemonSimple
}) {
  const asGrid = props.asGrid
  const pokemon = props.pokemon

  let showTypeEmblem = typeListToEmblems(pokemon?.type1, pokemon.type2)

  function chooseClassName() {
    if (asGrid) {
      return "AsGrid"
    } else { return "AsList"}
  }

  function ImageGridStyle() {
    return(
        {backgroundImage: asGrid ? `url(${getFullSize(pokemon.pokedexNr)})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 25%",
        backgroundSize: "150px 150px"}
    )
  }

  return (
    
      <div className={chooseClassName()}
           style={asGrid ? ImageGridStyle() : undefined}>
        <Link to={`/info/${pokemon.id}`} className="listingLink">
          <div className={"listing"+chooseClassName()}>
            <div className={"pokedexNumber"+chooseClassName()}>
              <h3>#{pokemon.pokedexNr}</h3>
              {!asGrid && <img className={"ListSprite"} src={getSprite(pokemon.pokedexNr)} alt={pokemon.name}/>}

            </div>
            <div className={"listingInfo"+chooseClassName()}>
              <div>
                <h5>{pokemon.name}</h5>
              </div>
              <p>Gen {pokemon.generation}</p>
            </div>
            <div className={"typeEmblem"+chooseClassName()}>
              {showTypeEmblem}
            </div>
          </div>
        </Link>
      </div>

  )
}