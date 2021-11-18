import React, { useEffect, useState } from 'react'
import '../style/Info.css';
import { Link, useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { PokemonAdvanced } from '../types';
import PokemonStarRating from "../components/PokemonStarRating";
import PokemonAggregatedRating from "../components/PokemonAggregatedRating";
import { getFullSize } from '../util/imageResolver';
import { typeListToEmblems } from '../util/helperFunctions';

export const GET_POKEMON_INFO = gql`
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

function Info() {

    type PokemonParams = {
        id: string;
    };      

    interface PokemonAdvancedData {
        pokemon: PokemonAdvanced
    }

    const { id } = useParams<PokemonParams>()

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
        // Add correct data (pokemon stats) to state
        if(data?.pokemon) setHp(data?.pokemon.hp)
        if(data?.pokemon) setAttack(data?.pokemon.attack)
        if(data?.pokemon) setDefense(data?.pokemon.defense)
        if(data?.pokemon) setSpAttack(data?.pokemon.sp_attack)
        if(data?.pokemon) setSpDefense(data?.pokemon.sp_defense)
        if(data?.pokemon) setSpeed(data?.pokemon.speed)
    }, [data])

    let showTypeEmblem = data ? typeListToEmblems(data.pokemon.type1, data?.pokemon.type2) : null

    function generateAbilities(ability1: string, ability2: string, ability3: string) {
        return <div className="ability-list">
            {ability1.length > 0 ? <span>1. {ability1}</span> : null}
            {ability2.length > 0 ? <span>2. {ability2}</span> : null}
            {ability3.length > 0 ? <span style={{color: "orange"}}>(Hidden ability) {ability3}</span> : null}
        </div>
    }

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
                            <tbody>
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
                            </tbody>
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
