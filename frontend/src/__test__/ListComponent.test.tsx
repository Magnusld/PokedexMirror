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
import selectedTypeReducer from "../redux/TypeSlice";
import selectedGenReducer from "../redux/generationSlice";
import searchReducer from "../redux/searchSlice";
import {ListComponent, GET_POKEMON_DATA} from "../components/ListComponent";
import { MockedProvider } from '@apollo/client/testing';

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

                }
            }
        }

    ]
    //const useSelectorMock = jest.spyOn(reactRedux, "useSelector")
    //const initialValue = {}

    beforeEach( () => {
        wrapper = mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider store={store}>
                    <ListComponent {...props}/>
                </Provider>
            </MockedProvider>)
    })
    afterEach(() => {
        //useSelectorMock.mockClear()
        //useSelectorMock.mockReturnValue(initialValue)
        store.clearActions()
    })

    it("renders", () => {
        expect(wrapper).not.toBeNull()
    })
})