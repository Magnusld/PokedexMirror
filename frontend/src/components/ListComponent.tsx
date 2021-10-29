import React, {useEffect, useState} from 'react';
import '../style/App.css';
import {ListingComponent} from "./ListingComponent";
import {AfterInputFields, PokemonSimple, Variables, OrderByInputFields} from "../types";
import { useQuery } from '@apollo/client';
import {Button} from "react-bootstrap";
import gql from 'graphql-tag';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export function ListComponent(props: {
  asGrid: boolean
}) {

  const [pokeData, setPokeData] = useState<any>([])
  const [nextAfterId, setNextAfterId] = useState<AfterInputFields|null>(null)
  const [nextPrevId, setNextPrevId] = useState<AfterInputFields|null>(null)

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
  function setQueryVariables(after:AfterInputFields|null=null, prev:AfterInputFields|null=null) : object {
    let orderBy : OrderByInputFields = {}
    if(sorting.type === "name") {
      orderBy = {"name": sorting.ordering}
    } else if(sorting.type === "pokedexNr") {
      orderBy = {"pokedexNr": sorting.ordering}
    }
    console.log(orderBy)
    let name : string | null = null
    searchInput ? name = searchInput : name = null
    let first: number | null = 15
    let last: number | null = null
    if (prev != null) {
      first = null
      last = 15
    }
    const variables : Variables = { 
      variables: {
        "orderBy" : orderBy,
        "first": first,
        "last": last,
        "after": after,
        "before": prev,
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

  const { loading, error, data } = useQuery<PokemonSimpleData, any>(GET_POKEMON_DATA, setQueryVariables(nextAfterId, nextPrevId));

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
  function showPrevListings() {
    console.log(pokeData)
    const newPrev: AfterInputFields = {
      id: pokeData[pokeData.length - 15].id
    }
    setNextAfterId(null)
    setNextPrevId(newPrev)
    console.log(nextPrevId)
  }
  function showFirstListings() {
    console.log(pokeData)
    const newPrev: AfterInputFields = {
      id: pokeData[0].id
    }
    setNextAfterId(null)
    setNextPrevId(newPrev)
    console.log(nextPrevId)
  }
  function showLastListings() {

  }

  function showNextListings() {
    console.log(pokeData)
    const newAfter: AfterInputFields = {
      id: pokeData[pokeData.length -1].id
    }
    setNextPrevId(null)
    setNextAfterId(newAfter)
    console.log(nextAfterId)
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
              {showListing(pokeData)}
            </div>
          )}
          <div className={"showMore"}>
            <div className={"PageNavButtonGroups"}>
              <Button className={"showNextButton"} onClick={showFirstListings}>&lt;&lt; Første side</Button>
            </div>
            <div className={"PageNavButtonGroups"}>
              <Button className={"showNextButton"} onClick={showPrevListings}> &lt; Forrige side</Button>
              <Button className={"showNextButton"} onClick={showNextListings}>Neste side &gt; </Button>
            </div>
            <div className={"PageNavButtonGroups"}>
              <Button className={"showNextButton"} onClick={showLastListings}>Siste side &gt;&gt;</Button>
            </div>
          </div>
      </div>
  )
}