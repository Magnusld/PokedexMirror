import React from "react";
import { mount } from "enzyme";
import * as reactRedux from "react-redux"
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider, useSelector} from 'react-redux'
import toJson from "enzyme-to-json";
import sortReducer from "../redux/sortSlice";
import selectedTypeReducer, {initiateList as typeInitiateList} from "../redux/TypeSlice";
import selectedGenReducer, {initiateList as genInitiateList} from "../redux/generationSlice";
import searchReducer from "../redux/searchSlice";
import {ListComponent, GET_POKEMON_DATA} from "../components/ListComponent";
import { MockedProvider } from '@apollo/client/testing';
import {act} from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

describe("Unit test on the ListComponent component", () => {
    let wrapper: any
    const mockStore = configureStore([thunk])
    const store = mockStore({
        reducer: {
            selectedGen: selectedGenReducer,
            selectedType: selectedTypeReducer,
            searchInput: searchReducer,
            sort: sortReducer
        }
    })
    const props = {
        asGrid: true
    }
    const mocks: any[] = [
        {
            request: {
                query: GET_POKEMON_DATA,
                variables: {
                    "orderBy": "asc",
                    "first": 5,
                    },
                },
            result: {
                data: {
                    pokemon0: {generation: 1, id: 3, name: "Bulbasaur", pokedexNr: 1, type1: "Grass", type2: "Poison"},
                    pokemon1: {generation: 1, id: 24, name: "Ivysaur", pokedexNr: 2, type1: "Grass", type2: "Poison"},
                    pokemon2: {generation: 1, id: 2, name: "Venusaur", pokedexNr: 3, type1: "Grass", type2: "Poison"},
                    pokemon3: {generation: 1, id: 68, name: "Charmander", pokedexNr: 4, type1: "Fire", type2: ""},
                    pokemon4: {generation: 1, id: 26, name: "Charmeleon", pokedexNr: 5, type1: "Fire", type2: ""}
                }
            }
        }

    ]
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector")
    const initialValue = {
        selectedGen: genInitiateList(),
        selectedType: typeInitiateList(),
        searchInput: "",
        sort: {type: "pokedexNr", ordering: "asc"}
    }

    beforeEach( async() => {
        useSelectorMock.mockReturnValue(initialValue)
        wrapper = mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider store={store}>
                    <ListComponent {...props}/>
                </Provider>
            </MockedProvider>)

        await new Promise(resolve => setTimeout(resolve, 0));
    })
    afterEach(() => {
        useSelectorMock.mockClear()
        store.clearActions()
    })

    it("renders", () => {
        expect(wrapper).not.toBeNull()
    })
})