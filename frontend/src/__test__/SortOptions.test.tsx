import React from "react";
import { mount } from "enzyme";
import * as reactRedux from "react-redux"
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import toJson from "enzyme-to-json";
import sortReducer from '../redux/sortSlice'
import { SortOptions } from "../components/SortOptions";

Enzyme.configure({ adapter: new Adapter() });

describe("Test the SortOptions Component", () => {

  let wrapper: any
  const mockStore = configureStore([thunk])
  const store = mockStore({
    sort: sortReducer
  })
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector")
  const initialValue = {type: "pokedexNr", ordering: "asc"}

  beforeEach(() => {
    wrapper = mount(<Provider store={store}><SortOptions/></Provider>)
  })
  afterEach(() => {
    useSelectorMock.mockClear()
    useSelectorMock.mockReturnValue(initialValue)
    store.clearActions()
  })

  it("renders", () => {
    expect(wrapper).not.toBeNull()
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})