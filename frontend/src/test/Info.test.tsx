import {render, screen, waitFor} from '@testing-library/react';
import { MemoryRouter, Route, Router } from 'react-router';
import Info, {GET_POKEMON_INFO} from '../pages/Info';
import { MockedProvider } from '@apollo/client/testing';
import renderer from "react-test-renderer";

const mocks = [
    {
      request: {
        query: GET_POKEMON_INFO,
        variables: {
            "where": {
                "id": 50
            }
        },
      },
      result: {
        data: {
          pokemon: { 
              id: 50, 
              pokedexNr: '365', 
              name: 'cola', 
              generation: 1, 
              species: 'brus', 
              type1: 'sukker', 
              type2: 'water', 
              heightMeter: 0.6, 
              weightKg: 0.5, 
              hp: 50, 
              attack: 50, 
              defense: 50, 
              sp_attack: 50, 
              sp_defense: 50, 
              speed: 50, 
              ability1: 'superspeed', 
              ability2: 'high-energy', 
              ability3: 'bad-teeth',
              aggregated_rating: 4
            },
        },
      },
    },
  ];

describe("correct info is displayed", () => {
    beforeEach(async () => {
        /*
        This render function will throw errors about using the function act(). These errors will
        not hinder the tests and can be ignored.
        */
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/info/50"]}>
                    <Route path="/info/:id">
                        <Info/>
                    </Route>
                </MemoryRouter>
            </MockedProvider>
        )

        await new Promise(resolve => setTimeout(resolve, 0));
    })

    it("correct pokenum, name and gen", () => {
        expect(screen.getByText(/#365/i)).toHaveClass("pokenum")
        expect(screen.getByText(/cola/i)).toHaveClass("pokename")
        expect(screen.getByText(/Generasjon:/i)).toHaveTextContent("Generasjon: 1")
    })

    it("correct weight and height", () => {
        expect(screen.getByText(/Weight:/i)).toHaveTextContent("0.5")
        expect(screen.getByText(/Height/i)).toHaveTextContent("0.6")
    })

    it("correct total stats", async () => {
        await waitFor(() => expect(screen.getByText(/300/i)).toHaveTextContent("300"))
    })

    it("correct abilities", () => {
        expect(screen.getByText(/1./i)).toHaveTextContent("superspeed")
        expect(screen.getByText(/2./i)).toHaveTextContent("high-energy")
        expect(screen.getByText(/Hidden ability./i)).toHaveTextContent("bad-teeth")
    })
    
})

describe("rendering is correct", () => {
    it("Snapshot-test of page", () => {
        const tree = renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter initialEntries={["/info/50"]}>
                <Route path="/info/:id">
                    <Info/>
                </Route>
            </MemoryRouter>
        </MockedProvider>).toJSON
        expect(tree).not.toBeNull()
        expect(tree).toMatchSnapshot()
    })

})


