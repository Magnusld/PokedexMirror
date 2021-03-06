import React, {useState} from 'react';
import '../style/App.css';
import {ListingComponent} from "./ListingComponent";
import {AfterInputFields, OrderByInputFields, PokemonSimple, Variables} from "../types";
import {useQuery} from '@apollo/client';
import {Button} from "react-bootstrap";
import gql from 'graphql-tag';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

export const GET_POKEMON_DATA = gql`
  query($orderBy: [PokemonOrderByInput!], $where: PokemonWhereInput, $first: Int, $after: PokemonWhereUniqueInput, $last: Int, $before: PokemonWhereUniqueInput) {
    pokemons(orderBy: $orderBy, where: $where, first: $first, after: $after, last: $last, before: $before,) {
      id
      pokedexNr
      name
      generation
      type1
      type2
    }
  }
  `;

export function ListComponent(props: {
  asGrid: boolean
}) {

  const [nextQueryIds, setNextQueryIds] = useState<any[]>([null, null])
  const [pageCounter, setPageCounter] = useState<number>(1)

  interface PokemonSimpleData {
    pokemons: PokemonSimple[]
  }


  const searchInput = useSelector((state: RootState) => state.searchInput.value)
  const selectedGen = useSelector((state: RootState) => state.selectedGen.value.filter(element => element.selected).map(element => element.id + 1))
  const selectedType = useSelector((state: RootState) => state.selectedType.value.filter(element => element.selected).map(element => element.name))
  const sorting = useSelector((state: RootState) => state.sort.value)

  /**
   * used by useQuery hook
   * @returns a set of variables to be used by graphQL query
   */
  function setQueryVariables() : object {
    let after = nextQueryIds[0]
    let before = nextQueryIds[1]
    let orderBy : OrderByInputFields = {}
    if(sorting.type === "name") {
      orderBy = {"name": sorting.ordering}
    } else if(sorting.type === "pokedexNr") {
      orderBy = {"pokedexNr": sorting.ordering}
    }
    let name : string | null = null
    searchInput ? name = searchInput : name = null

    let first: number | null = 15
    let last: number | null = null
    if (pageCounter != 1){
      if (after == null && before != null){
        last = 15
        first = null
      }
    }

    return {
      variables: {
        "orderBy": orderBy,
        "first": first,
        "last": last,
        "after": after,
        "before": before,
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
    };
  }

  const { loading, error, data } = useQuery<PokemonSimpleData, any>(GET_POKEMON_DATA, setQueryVariables());

  const asGrid = props.asGrid


  /**
   * used to render pokemon to grid/list
   * @returns a list with compontents
   */
  function showListing(pokeList: any[] | undefined) {

    if(pokeList != undefined) {
      return pokeList.map((pokemon : PokemonSimple, i) => (
        <ListingComponent key={i} asGrid={asGrid} pokemon={pokemon} />
      ))
    }
    else {
      return <div id={"fail"}>Failed!</div>
    }
  }
  function showPrevListings() {
    setPageCounter(pageCounter - 1)
    if (pageCounter == 2) {
      setNextQueryIds([null, null])
    } else {
      if (data != undefined) {
        const newPrev: AfterInputFields = {
          id: data.pokemons[0].id
        }
        setNextQueryIds([null, newPrev])
      }
    }
  }
  function showFirstListings() {
    setPageCounter(1)
    setNextQueryIds([null, null])
  }


  function showNextListings() {
    setPageCounter(pageCounter + 1)
    if (data != undefined) {
      const newAfter: AfterInputFields = {
        id: data.pokemons[data.pokemons.length -1].id
      }
      setNextQueryIds([newAfter, null])
    }
  }

  function chooseClassName() {
    if (asGrid) {
      return "AsGrid"
    } else { return "AsList"}
  }

  if (error) return <div id={"error"}>Error! {error.message}</div>;

  return (
      <div id="list">
          {loading ? (<p>Loading</p>) : (
            <div className={"list"+chooseClassName()}>
              {showListing(data?.pokemons)}
            </div>
          )}
          <div className={"showMore"}>
            <div className={"PageNavButtonGroups"}>
              <Button id="firstPageButton" className={"showNextButton"} onClick={showFirstListings}>&lt;&lt; F??rste side</Button>
            </div>
            <div className={"PageNavButtonGroups"}>
              <Button id="prevPageButton" className={"showNextButton"} onClick={showPrevListings} disabled={pageCounter==1} > &lt; Forrige side</Button>
              <div className="page-counter">{pageCounter}</div>
              <Button id="nextPageButton" className={"showNextButton"} onClick={showNextListings} disabled={data?.pokemons.length != 15}>Neste side &gt; </Button>
            </div>
            <div className={"PageNavButtonGroups"}>
              {/*Funksjonalitet for en annen gang :)*/}
              <Button className={"showNextButton"} style={{visibility: "hidden"}}>Siste side &gt;&gt;</Button>
            </div>
          </div>
      </div>
  )
}