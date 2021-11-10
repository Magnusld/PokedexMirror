import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import '../style/Info.css';
import pokemon from "../images/376.jpg";
import { Link, useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { PokemonAdvanced } from '../types';
import PokemonStarRating from "../components/PokemonStarRating";
import PokemonAggregatedRating from "../components/PokemonAggregatedRating";
import { getFullSize } from '../util/imageResolver';

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

function Info() {

    type PokemonParams = {
        id: string;
    };      

    interface PokemonAdvancedData {
        pokemon: PokemonAdvanced
    }

    const { id } = useParams<PokemonParams>()

    const GET_POKEMON_INFO = gql`
    query($where: PokemonWhereUniqueInput!) {
        pokemon(where: $where) {
          id
          pokedexNr
          name
          generation
          species
          type1
          heightMeter
          type2
          weightKg
          hp
          attack
          defense
          sp_attack
          sp_defense
          speed
          ability1
          ability2
          ability3
          aggregated_rating
        }
      }
    `;

    const variables = {
        variables: {
            "where": {
                "id": parseInt(id)
            }
        }  
    }

    const { loading, error, data } = useQuery<PokemonAdvancedData, any>(GET_POKEMON_INFO, variables);

    const [hp, setHp] = useState<number>(0);
    const [attack, setAttack] = useState<number>(0);
    const [defense, setDefense] = useState<number>(0);
    const [spAttack, setSpAttack] = useState<number>(0);
    const [spDefense, setSpDefense] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(0);

    useEffect(() => {
        console.log("useEffect")
        if(data?.pokemon) setHp(data?.pokemon.hp)
        if(data?.pokemon) setAttack(data?.pokemon.attack)
        if(data?.pokemon) setDefense(data?.pokemon.defense)
        if(data?.pokemon) setSpAttack(data?.pokemon.sp_attack)
        if(data?.pokemon) setSpDefense(data?.pokemon.sp_defense)
        if(data?.pokemon) setSpeed(data?.pokemon.speed)
    }, [data])

    /**
     * takes potential type 1 and type 2 and makes it into a list
     * @param types rest param with one or two types
     * @returns 
     */
    function typesToList(...types : string[]) {
        const typeList = types.filter((type) => type.length > 0);
        return typeList;
    }

    let showTypeEmblem = typesToList(data ? data.pokemon.type1 : "", data ? data.pokemon.type2 : "").map((Type) => (
        <span>
          {Type === "Bug" ? <Bug className={"typeIcon"}/> : null}
          {Type === "Dark" ? <Dark className={"typeIcon"}/> : null}
          {Type === "Dragon" ? <Dragon className={"typeIcon"}/> : null}
          {Type === "Electric" ? <Electric className={"typeIcon"}/> : null}
          {Type === "Fairy" ? <Fairy className={"typeIcon"}/> : null}
          {Type === "Fighting" ? <Fighting className={"typeIcon"}/> : null}
          {Type === "Fire" ? <Fire className={"typeIcon"}/> : null}
          {Type === "Flying" ? <Flying className={"typeIcon"}/> : null}
          {Type === "Ghost" ? <Ghost className={"typeIcon"}/> : null}
          {Type === "Grass" ? <Grass className={"typeIcon"}/> : null}
          {Type === "Ground" ? <Ground className={"typeIcon"}/> : null}
          {Type === "Ice" ? <Ice className={"typeIcon"}/> : null}
          {Type === "Normal" ? <Normal className={"typeIcon"}/> : null}
          {Type === "Poison" ? <Poison className={"typeIcon"}/> : null}
          {Type === "Psychic" ? <Psychic className={"typeIcon"}/> : null}
          {Type === "Rock" ? <Rock className={"typeIcon"}/> : null}
          {Type === "Steel" ? <Steel className={"typeIcon"}/> : null}
          {Type === "Water" ? <Water className={"typeIcon"}/> : null}
        </span>
    ))

    function generateTypes(types : string[]) {
        if(types.length === 1) {
            let color1 = setTypeColor(types[0])
            return <div className="types"><span className="type-icon" style={{backgroundColor: color1}}>{types[0]}</span></div>
        }
        else if(types.length === 2) {
            let color1 = setTypeColor(types[0])
            let color2 = setTypeColor(types[1])
            return <div className="types"><span className="type-icon" style={{backgroundColor: color1}}>{types[0]}</span><span className="type-icon" style={{backgroundColor: color2}}>{types[1]}</span></div>
        }
        else {
            return <div className="types"><span className="type-icon" style={{backgroundColor: "white"}}>None</span></div>
        }
    }

    function generateAbilities(ability1: string, ability2: string, ability3: string) {
        return <div className="ability-list">
            {ability1.length > 0 ? <span>1. {ability1}</span> : null}
            {ability2.length > 0 ? <span>2. {ability2}</span> : null}
            {ability3.length > 0 ? <span style={{color: "orange"}}>(Hidden ability) {ability3}</span> : null}
        </div>
    }

    const colours : any = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    function setTypeColor(type : string) {
        let string = type.toLowerCase()
        if(string in colours) {
            return colours[string]
        }
        else {
            return 'grey'
        }
        
    }

    console.log(data)

    return (
        <div className={"container"}>
            <header className="info-header-container">
                <Link to="/" className="back-button-link">
                    <div className="back-button-container">
                        <span className="material-icons md-36">arrow_back</span>
                        <span className="back-button-text">Tilbake</span>
                    </div>
                </Link>
            </header>
            <div className="info-container">
                <div className="top-container">
                    <div className="image">
                        <img src={getFullSize(data ? data.pokemon.pokedexNr : 0)} alt={data?.pokemon.name + " bilde"}></img>
                    </div>
                    <div className="basic-info">
                        <div className="name-number">
                            <span className="pokename">{data?.pokemon.name}</span>
                            <span className="pokenum">#{data?.pokemon.pokedexNr}</span>
                        </div>
                        <div className="more-info">
                            <span>{data?.pokemon.species}</span>
                            <span>Generasjon: {data?.pokemon.generation}</span>
                        </div>
                        <div className="types">
                            {showTypeEmblem}
                        </div>
                        <div className={"all-ratings-container"}>
                            <PokemonStarRating pokemonId={parseInt(id)}/>
                            <PokemonAggregatedRating rating={data ? data.pokemon.aggregated_rating : 0}/>
                        </div>
                    </div>
                </div>
                <div className="middle-container">
                    <span>Weight: {data?.pokemon.weightKg}kg</span>
                    <span>Height: {data?.pokemon.heightMeter}m</span>
                </div>
                <div className="bottom-container">
                    <div className="stats">
                        <h2>Stats</h2>
                        <table className="stats-table">
                            <tr>
                                <td>HP</td>
                                <td>{hp}</td>
                            </tr>
                            <tr>
                                <td>Attack</td>
                                <td>{attack}</td>
                            </tr>
                            <tr>
                                <td>Defense</td>
                                <td>{defense}</td>
                            </tr>
                            <tr>
                                <td>Sp. Attack</td>
                                <td>{spAttack}</td>
                            </tr>
                            <tr>
                                <td>Sp. Defense</td>
                                <td>{spDefense}</td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td>{speed}</td>
                            </tr>
                            <tr>
                                <td>Totalt</td>
                                <td>{hp + attack + defense + spAttack + spDefense + speed}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="abilities">
                        <h2>Abilities</h2>
                        {generateAbilities(data ? data.pokemon.ability1 : "", data ? data.pokemon.ability2 : "", data ? data.pokemon.ability3 : "")}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Info
