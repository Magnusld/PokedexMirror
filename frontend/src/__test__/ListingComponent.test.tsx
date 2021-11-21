import * as ReactDOM from 'react-dom';
import React from "react";
import {ListingComponent} from "../components/ListingComponent"
import renderer from "react-test-renderer";
import {PokemonSimple} from "../types";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const charmander: PokemonSimple = {
    id: 27,
    pokedexNr: 4,
    name: "Charmander",
    type1: "Fire",
    type2: "",
    generation: 1
}

describe("Test that a listing renders correctly", () => {

    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(<Router> <ListingComponent asGrid={true} pokemon={charmander} key={1}/> </Router>, container)
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.resetAllMocks();
    })

    it("Snapshottest of component", () => {
        const tree = renderer.create(<Router> <ListingComponent asGrid={true} pokemon={charmander} key={1}/> </Router>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("test that the listing display the correct info", () => {
        const info = container.querySelectorAll("div.listingAsGrid").item(0)
        expect(info).toBeInTheDocument()
        const name = info.querySelectorAll("h5").item(0).textContent
        const pokeNum = info.querySelectorAll("h3").item(0).textContent
        expect(name).toEqual("Charmander")
        expect(pokeNum).toEqual("#4")
        /*If both of these is correct, it's trivial that the rest of the displayed info is correct */
    })
})