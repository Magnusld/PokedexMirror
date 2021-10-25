import React, {useEffect} from 'react';
import '../style/App.css';
import {ListingComponent} from "./ListingComponent";
import {PokemonSimple} from "../types";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

export function ListComponent(props: {
  asGrid: boolean
}) {

  interface PokemonSimpleData {
    pokemons: PokemonSimple[]
  }

  const GET_POKEMON_DATA = gql`
    query($orderBy: [PokemonOrderByInput!], $first: Int) {
      pokemons(orderBy: $orderBy, first: $first) {
        id
        pokedexNr
        name
        generation
        type1
        type2
      }
    }
  `;

  /**
   * used by useQuery hook
   * @returns a set of variables to be used by graphQL query
   */
  function setQueryVariables() : any {
    const variables = {
      variables: {
        "orderBy": {
          "pokedexNr": "asc"
        },
        "first": 20
      }
      
    }
    return variables;
  }

  const { loading, error, data } = useQuery<PokemonSimpleData, any>(GET_POKEMON_DATA, setQueryVariables());

  const asGrid = props.asGrid

  useEffect(() => {
    console.log(setQueryVariables())
    console.log(data)
    console.log(asGrid)
  })

  /**
   * used to render pokemon to grid/list
   * @returns a list with compontents
   */
  function showListing() {
    let pokeList : PokemonSimple[] = []
    if(data !== undefined) {
      pokeList = data.pokemons
      return pokeList.map((pokemon : PokemonSimple) => (
        <ListingComponent key={pokemon.id} asGrid={asGrid} pokemon={pokemon} />
      ))
    }
    else {
      return <div>Failed!</div>
    }
  }

  function chooseClassName() {
    if (asGrid) {
      return "AsGrid"
    } else { return "AsList"}
  }

  if (error) return <div>Error! error.message</div>;

  return (
      <div>
          {loading ? (<p>Loading</p>) : (
            <div className={"list"+chooseClassName()}>
              {showListing()}
            </div>
          )}
      </div>
  )
}