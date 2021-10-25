import React, {useEffect} from 'react';
import '../style/App.css';
import {ListingComponent} from "./ListingComponent";
import {PokemonSimple, Variables} from "../types";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import {Button} from "react-bootstrap";

export function ListComponent(props: {
  asGrid: boolean
}) {

  const pokeData: PokemonSimple[] = []

  interface PokemonSimpleData {
    pokemons: PokemonSimple[]
  }

  const GET_POKEMON_DATA = gql`
  query($orderBy: [PokemonOrderByInput!], $where: PokemonWhereInput, $first: Int, $after: PokemonWhereUniqueInput) {
    pokemons(orderBy: $orderBy, where: $where, first: $first, after: $after) {
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
  function setQueryVariables(after=null) : object {
    const variables : Variables = { 
      variables: {
        "orderBy": {
          "pokedexNr": "asc"
        },
        "first": 15,
        "after": after,
        "where": {
          "type1": {
            "in": [
              "Bug",
              "Dark",
              "Dragon",
              "Electric",
              "Fairy",
              "Fighting",
              "Fire",
              "Flying",
              "Ghost",
              "Grass",
              "Ground",
              "Ice",
              "Normal",
              "Poison",
              "Psychic",
              "Rock",
              "Steel",
              "Water"
            ]
          },
          "generation": {
            "in": [1, 2, 3, 4, 5, 6, 7, 8]
          }
        }
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
      pokeList.forEach((e) => { pokeData.push(e) })
      return pokeData.map((pokemon : PokemonSimple) => (
        <ListingComponent key={pokemon.id} asGrid={asGrid} pokemon={pokemon} />
      ))
    }
    else {
      return <div>Failed!</div>
    }
  }

  function showMoreListings() {
    let paginationObj: any = {
      "id": pokeData[pokeData.length - 1].id
    }
    setQueryVariables(paginationObj)
    console.log(paginationObj)
    console.log(pokeData)
    showListing()
    console.log(pokeData)
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
          <div className={"showMore"}>
            <Button className={"showMoreButton"} onClick={showMoreListings}>Vis flere</Button>
          </div>
      </div>
  )
}