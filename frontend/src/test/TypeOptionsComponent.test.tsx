import React from "react";
import { mount } from "enzyme";
import * as reactRedux from "react-redux"
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import toJson from "enzyme-to-json";
import selectedTypeReducer, {initiateList} from "../redux/TypeSlice";
import {TypeOptionComponent} from "../components/TypeOptionComponent";

Enzyme.configure({ adapter: new Adapter() });

describe("Test for TypeOptionComponent", () => {
  let wrapper: any
  const mockStore = configureStore([thunk])
  const store = mockStore({
    selectedType: selectedTypeReducer
  })
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector")
  const initialValue = initiateList()

  beforeEach(() => {
    useSelectorMock.mockClear()
    useSelectorMock.mockReturnValue(initialValue)
    store.clearActions()
    wrapper = mount(<Provider store={store}><TypeOptionComponent /></Provider>)
  })

  it("renders", () => {
    expect(wrapper).not.toBeNull()
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  /**
   * Iterate over all type selection buttons, and check that they dispatch the correct call to redux store
   */

  it("displays the correct buttons", () => {
    const typeButtons = wrapper.find("label.mb-2.btn")
    expect(typeButtons).not.toBeNull()
    expect(typeButtons).toHaveLength(18)
    typeButtons.map((button:any, i:number) => {
      store.clearActions()
      expect(button).not.toBeNull()
      button.simulate("click")
      const expectedPayload = {type:"selectedType/swapSelectedType", payload: i}
      const actions = store.getActions()
      expect(actions).toEqual([expectedPayload])
    })
  })


  it("dispatches selectAll and removeAll correctly", () => {
    const removeAllButton = wrapper.find("button.clearAllButton")
    expect(removeAllButton).not.toBeNull()
    removeAllButton.simulate("click")
    // Payload is set to undefined as there is no payload, but the mockStore function require payload
    const removeExpectedPayload = {type: "selectedType/setAllTypesFalse", payload: undefined}
    const selectAllButton = wrapper.find("button.setAllButton")
    expect(selectAllButton).not.toBeNull()
    selectAllButton.simulate("click")
    const setAllExpectedPayload = {type: "selectedType/setAllTypesTrue", payload: undefined}
    const actions = store.getActions()
    expect(actions).toEqual([removeExpectedPayload, setAllExpectedPayload])
  })
})