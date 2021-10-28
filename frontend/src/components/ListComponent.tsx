import React, {useEffect} from 'react';
import '../style/App.css';
import {ListingComponent} from "./ListingComponent";
import {OrderByInputFields, PokemonSimple, Variables} from "../types";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export function ListComponent(props: {
  asGrid: boolean
}) {

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

  const searchInput = useSelector((state: RootState) => state.searchInput.value)
  const selectedGen = useSelector((state: RootState) => state.selectedGen.value.filter(element => element.selected).map(element => element.id + 1))
  const selectedType = useSelector((state: RootState) => state.selectedType.value.filter(element => element.selected).map(element => element.name))
  const sorting = useSelector((state: RootState) => state.sort.value)

  useEffect(() => {
    console.log(searchInput)
    console.log(selectedGen)
    console.log(selectedType);
    console.log(sorting);
    
    
  }, [searchInput, selectedGen, selectedType, sorting])


  /**
   * used by useQuery hook
   * @returns a set of variables to be used by graphQL query
   */
  function setQueryVariables() : any {
    let orderBy : OrderByInputFields = {}
    if(sorting.type === "name") {
      orderBy = {"name": sorting.ordering}
    } else if(sorting.type === "pokedexNr") {
      orderBy = {"pokedexNr": sorting.ordering}
    }

    console.log(orderBy)

    let name : string | null = null
    searchInput ? name = searchInput : name = null

    const variables : Variables = { 
      variables: {
        "orderBy" : orderBy,
        "first": 15,
        "after": null,
        "where": {
          "type1": {
            "in": selectedType
          },
          "generation": {
            "in": selectedGen
          },
          "name": {
            "contains": name
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

  if (error) return <div>Error! {error.message}</div>;

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