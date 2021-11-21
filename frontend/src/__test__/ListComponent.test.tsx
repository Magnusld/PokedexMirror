import React from "react";
import {mount, shallow} from "enzyme";
import * as reactRedux from "react-redux"
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider, useSelector} from 'react-redux'
import toJson from "enzyme-to-json";
import sortReducer from "../redux/sortSlice";
import selectedTypeReducer from "../redux/TypeSlice";
import selectedGenReducer from "../redux/generationSlice";
import searchReducer from "../redux/searchSlice";
import {ListComponent, GET_POKEMON_DATA} from "../components/ListComponent";
import { MockedProvider } from '@apollo/client/testing';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

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
    const initialValue = {
        selectedGen: [{
            id: 0, selected: true, name: "Gen " + 1
        }],
        selectedType: [
            {id: 0, selected: true, name: "Grass"},
            {id: 1, selected: true, name: "Fire"}
        ],
        searchInput: "",
        sort: {type: "pokedexNr", ordering: "asc"}
    }
    const mocks: any[] = [
        {
            request: {
                query: GET_POKEMON_DATA,
                variables: {
                    "orderBy": {},
                    "first": 15,
                    "last": null,
                    "after": null,
                    "before": null,
                    "where": {"type1":{"in":{"selectedGen":[{"id":0,"selected":true,"name":"Gen 1"}],"selectedType":[{"id":0,"selected":true,"name":"Grass"},{"id":1,"selected":true,"name":"Fire"}],"searchInput":"","sort":{"type":"pokedexNr","ordering":"asc"}}},"generation":{"in":{"selectedGen":[{"id":0,"selected":true,"name":"Gen 1"}],"selectedType":[{"id":0,"selected":true,"name":"Grass"},{"id":1,"selected":true,"name":"Fire"}],"searchInput":"","sort":{"type":"pokedexNr","ordering":"asc"}}},"name":{"contains":{"selectedGen":[{"id":0,"selected":true,"name":"Gen 1"}],"selectedType":[{"id":0,"selected":true,"name":"Grass"},{"id":1,"selected":true,"name":"Fire"}],"searchInput":"","sort":{"type":"pokedexNr","ordering":"asc"}}}}
                    },
                },
            result: {
                data: {
                    pokemons :[
                        {__typename: "Pokemon", generation: 1, id: 3, name: "Bulbasaur", pokedexNr: 1, type1: "Grass", type2: "Poison"},
                        {__typename: "Pokemon", generation: 1, id: 24, name: "Ivysaur", pokedexNr: 2, type1: "Grass", type2: "Poison"},
                        {__typename: "Pokemon", generation: 1, id: 2, name: "Venusaur", pokedexNr: 3, type1: "Grass", type2: "Poison"},
                        {__typename: "Pokemon", generation: 1, id: 68, name: "Charmander", pokedexNr: 4, type1: "Fire", type2: ""},
                        {__typename: "Pokemon", generation: 1, id: 26, name: "Charmeleon", pokedexNr: 5, type1: "Fire", type2: ""}
                    ]
                }
            }
        }

    ]
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector")

    afterEach(() => {
        useSelectorMock.mockClear()
        store.clearActions()
    })

    it("renders as Grid", async () => {
        useSelectorMock.mockReturnValue(initialValue)
        wrapper = await mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider store={store}>
                    <Router>
                        <ListComponent asGrid={true}/>
                    </Router>
                </Provider>
            </MockedProvider>)

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(wrapper).not.toBeNull()
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it("renders as List", async () => {
        useSelectorMock.mockReturnValue(initialValue)
        wrapper = await mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider store={store}>
                    <Router>
                        <ListComponent asGrid = {false}/>
                    </Router>
                </Provider>
            </MockedProvider>)

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(wrapper).not.toBeNull()
    })

    it("renders correct listings", async () => {
        useSelectorMock.mockReturnValue(initialValue)
        wrapper = await shallow(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider store={store}>
                    <Router>
                        <ListComponent asGrid={true}/>
                    </Router>
                </Provider>
            </MockedProvider>)

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(wrapper.find("p")).not.toBeNull()
    })

    it("handles page changes correctly", async () => {
        useSelectorMock.mockReturnValue(initialValue)
        wrapper = await mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider store={store}>
                    <Router>
                        <ListComponent asGrid={true}/>
                    </Router>
                </Provider>
            </MockedProvider>)

        await new Promise(resolve => setTimeout(resolve, 0));

        const nextPageButton = wrapper.find("#nextPageButton").at(0)
        expect(nextPageButton).not.toBeNull()
        await nextPageButton.simulate("click")
        /**
         * Because we are mocking the response, we are going to get the same pokemon on every page
         */
        expect(wrapper.find("div.AsGrid")).toHaveLength(5)

        const prevPageButton = wrapper.find("#prevPageButton").at(0)
        expect(prevPageButton).not.toBeNull()
        await prevPageButton.simulate("click")
        expect(wrapper.find("div.AsGrid")).toHaveLength(5)

        await nextPageButton.simulate("click")
        await nextPageButton.simulate("click")

        const firstPageButton = wrapper.find("#firstPageButton").at(0)
        expect(firstPageButton).not.toBeNull()
        await firstPageButton.simulate("click")
        expect(wrapper.find("div.AsGrid")).toHaveLength(5)
    })

})

describe("Fail to get data", () => {
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
    const initialValue = {
        selectedGen: [{
            id: 0, selected: true, name: "Gen " + 1
        }],
        selectedType: [
            {id: 0, selected: true, name: "Grass"},
            {id: 1, selected: true, name: "Fire"}
        ],
        searchInput: "",
        sort: {type: "pokedexNr", ordering: "asc"}
    }
    const mocks: any[] = [
        {
            request: {
                query: GET_POKEMON_DATA,
                variables: {
                    "orderBy": {},
                    "first": 15,
                    "last": null,
                    "after": null,
                    "before": null,
                    "where": {"type1":{"in":{"selectedGen":[{"id":0,"selected":true,"name":"Gen 1"}],"selectedType":[{"id":0,"selected":true,"name":"Grass"},{"id":1,"selected":true,"name":"Fire"}],"searchInput":"","sort":{"type":"pokedexNr","ordering":"asc"}}},"generation":{"in":{"selectedGen":[{"id":0,"selected":true,"name":"Gen 1"}],"selectedType":[{"id":0,"selected":true,"name":"Grass"},{"id":1,"selected":true,"name":"Fire"}],"searchInput":"","sort":{"type":"pokedexNr","ordering":"asc"}}},"name":{"contains":{"selectedGen":[{"id":0,"selected":true,"name":"Gen 1"}],"selectedType":[{"id":0,"selected":true,"name":"Grass"},{"id":1,"selected":true,"name":"Fire"}],"searchInput":"","sort":{"type":"pokedexNr","ordering":"asc"}}}}
                },
            },
            result: {
                data: undefined
            }
        }

    ]
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector")

    afterEach(() => {
        useSelectorMock.mockClear()
        store.clearActions()
    })

    it("receives no data", async () => {

        useSelectorMock.mockReturnValue(initialValue)
        wrapper = await mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider store={store}>
                    <Router>
                        <ListComponent asGrid = {true}/>
                    </Router>
                </Provider>
            </MockedProvider>)

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(wrapper.find("#fail")).not.toBeNull()
    })
})

