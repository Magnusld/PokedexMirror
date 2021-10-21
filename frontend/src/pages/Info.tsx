import React from 'react'
import { Button, Card } from 'react-bootstrap';
import '../style/Info.css';
import pokemon from "../images/376.jpg";

function Info() {

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
                        <span className="pokename">Metagross</span>
                        <span className="pokenum">#376</span>
                    </div>
                    <div className="more-info">
                        <span>Iron Leg Pokemon</span>
                        <span>Generasjon: 3</span>
                    </div>
                    <div>
                        {generateTypes(["Steel", "Psychic"])}
                    </div>
                </div>
            </div>
            <div className="middle-container">
                <span>Weigth:</span>
                <span>Heigt:</span>
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
