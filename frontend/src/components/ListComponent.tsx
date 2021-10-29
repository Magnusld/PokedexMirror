import React, {useEffect, useState} from 'react';
import '../style/App.css';
import {ListingComponent} from "./ListingComponent";
import {AfterInputFields, PokemonSimple, Variables} from "../types";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import {Button} from "react-bootstrap";

export function ListComponent(props: {
  asGrid: boolean
}) {

  const [pokeData, setPokeData] = useState<any>([])
  const [nextAfterId, setNextAfterId] = useState<AfterInputFields|null>(null)

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
  function setQueryVariables(after:AfterInputFields|null=null) : object {
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

  const { loading, error, data } = useQuery<PokemonSimpleData, any>(GET_POKEMON_DATA, setQueryVariables(nextAfterId));

  const asGrid = props.asGrid

  useEffect(() => {
    console.log(data)
    console.log(asGrid)
    let pokeList : PokemonSimple[] = []
    if(data !== undefined) {
      pokeList = data.pokemons
      setPokeData(pokeList)
    }
  })

  /**
   * used to render pokemon to grid/list
   * @returns a list with compontents
   */
  function showListing(pokeList: any[] | null) {
    if(pokeList != null) {
      return pokeList.map((pokemon : PokemonSimple) => (
        <ListingComponent key={pokemon.id} asGrid={asGrid} pokemon={pokemon} />
      ))
    }
    else {
      return <div>Failed!</div>
    }
  }

  function showMoreListings() {
    console.log(pokeData)
    const newAfter: AfterInputFields = {
      id: pokeData[pokeData.length -1].id
    }
    setNextAfterId(newAfter)
    console.log(nextAfterId)
    console.log(setQueryVariables(nextAfterId))
    /*
    let pokeList : PokemonSimple[] = []
    if(data !== undefined) {
      pokeList = data.pokemons
      setPokeData(pokeList)
    }

     */
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
              {showListing(pokeData)}
            </div>
          )}
          <div className={"showMore"}>
            <Button className={"showMoreButton"} onClick={showMoreListings}>Vis flere</Button>
          </div>
      </div>
  )
}