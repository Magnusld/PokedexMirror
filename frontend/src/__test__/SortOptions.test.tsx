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

  it("dispatches change on type correctly", () => {
    const typeSortSelector = wrapper.find("select.sort-select.form-select").at(0)
    expect(typeSortSelector).not.toBeNull()
    typeSortSelector.simulate("change", {
      target: {value: "name"}
    })
    const expectedDispatch = {type: "sort/changeSortType", payload: "name"}
    const actions = store.getActions()
    expect(actions).toEqual([expectedDispatch])
  })

  it("dispatches change on order correctly", () => {
    const orderSortSelector = wrapper.find("select.sort-select.form-select").at(1)
    expect(orderSortSelector).not.toBeNull()
    orderSortSelector.simulate("change", {
      target: {value: "desc"}
    })
    const expectedDispatch = {type: "sort/changeSortOrder", payload: "desc"}
    const actions = store.getActions()
    expect(actions).toEqual([expectedDispatch])
  })

})