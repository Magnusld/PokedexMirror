import React from 'react'
import { Button, Card } from 'react-bootstrap';
import '../style/Info.css';
import pokemon from "../images/376.jpg";
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { PokemonAdvanced } from '../types';

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

    /**
     * takes potential type 1 and type 2 and makes it into a list
     * @param types rest param with one or two types
     * @returns 
     */
    function typesToList(...types : string[]) {
        const typeList = types.filter((type) => type.length > 0)
        return typeList;
    }

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
        <div className="info-container">
            <div className="top-container">
                <div className="image">
                    <Card style={{width: "100%", height: "auto"}}>
                        <Card.Img variant="top" src={pokemon} style={{border: '1px solid rgba(0, 0, 0, 0.5)', borderBottom: "none"}}/>
                        <Card.Body style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding: 5}}>
                            <Card.Title style={{textAlign: "center"}}>Normal Pokemon</Card.Title>
                        </Card.Body>
                    </Card>
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
                    <div>
                        {generateTypes(typesToList(data ? data.pokemon.type1 : "", data ? data.pokemon.type2 : ""))}
                    </div>
                </div>
            </div>
            <div className="middle-container">
                <span>Weigth: {data?.pokemon.weightKg}kg</span>
                <span>Height: {data?.pokemon.heightMeter}m</span>
            </div>
            <div className="bottom-container">
                <div className="stats">
                    <div className="stats-column">
                        <span>HP</span>
                        <span>Attack</span>
                        <span>Defense</span>
                        <span>Sp. Attack</span>
                        <span>Sp. Defense</span>
                        <span>Speed</span>
                    </div>
                    <div className="stats-column">
                        <span>80</span>
                        <span>135</span>
                        <span>130</span>
                        <span>95</span>
                        <span>90</span>
                        <span>70</span>
                    </div>

                </div>
                <div className="abilities"></div>
            </div>
        </div>
    )
}

export default Info
