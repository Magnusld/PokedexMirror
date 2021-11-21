import React from "react";
import { shallow, mount } from "enzyme";
import * as reactRedux from "react-redux"
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import toJson from "enzyme-to-json";
import App from "../App";
import selectedGenReducer from "../redux/generationSlice";
import selectedTypeReducer from "../redux/TypeSlice";
import searchReducer from "../redux/searchSlice";
import sortReducer from "../redux/sortSlice";
import { MockedProvider } from '@apollo/client/testing';

Enzyme.configure({ adapter: new Adapter() });

describe("test mounting App with mock data", () => {
  let wrapper: any;
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
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector")

  const mocks: any[] = []

  beforeEach(() => {
    useSelectorMock.mockClear()
    useSelectorMock.mockReturnValue(initialValue)
    wrapper = mount(<MockedProvider mocks={mocks}><Provider store={store}><App/></Provider></MockedProvider>)
  })

  it("renders", () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})