import React from "react";
import { mount } from "enzyme";
import * as reactRedux from "react-redux"
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import toJson from "enzyme-to-json";
import selectedGenReducer, {initiateList} from "../redux/generationSlice";
import {GenOptionsComponent} from "../components/GenOptionsComponent";

Enzyme.configure({ adapter: new Adapter() });

describe("Test av GenOptionsComponent", () => {
  let wrapper: any
  const mockStore = configureStore([thunk])
  const store = mockStore({
    selectedGen: selectedGenReducer
  })

  const useSelectorMock = jest.spyOn(reactRedux, "useSelector")
  const defaultValue = initiateList()

  beforeEach(()=>{
    useSelectorMock.mockClear()
    useSelectorMock.mockReturnValue(defaultValue)
    store.clearActions()
    wrapper = mount(<Provider store={store}><GenOptionsComponent /></Provider>)
  })

  it("renders", () => {
    expect(wrapper).not.toBeNull()
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it("dispatches correctly on gen selection", () => {
    const genSelectionButtons = wrapper.find("label.mb-2")
    expect(genSelectionButtons).toHaveLength(8)
    const eightGenSelectionButton = wrapper.find({children: "Gen 8"}).find("label")
    eightGenSelectionButton.simulate("click")
    const actions = store.getActions()
    const expectedPayload = {type: "selectedGen/swapSelectedGen", payload: 7}
    expect(actions).toEqual([expectedPayload])
  })

  it("dispatches selectAll and removeAll", () => {
    const removeAllButton = wrapper.find("button.clearAllButton")
    expect(removeAllButton).not.toBeNull()
    removeAllButton.simulate("click")
    // Payload is set to undefined as there is no payload, but the mockStore function require payload
    const removeExpectedPayload = {type: 'selectedGen/setAllGensFalse', payload: undefined}
    const selectAllButton = wrapper.find("button.setAllButton")
    expect(selectAllButton).not.toBeNull()
    selectAllButton.simulate("click")
    const setAllExpectedPayload = {type: 'selectedGen/setAllGensTrue', payload: undefined}
    const actions = store.getActions()
    expect(actions).toEqual([removeExpectedPayload, setAllExpectedPayload])
  })
})
