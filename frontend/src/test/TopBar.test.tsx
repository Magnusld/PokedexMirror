import React from "react";
import { mount } from "enzyme";
import {TopBar} from "../components/TopBar";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import toJson from "enzyme-to-json";
import searchReducer from "../redux/searchSlice";

Enzyme.configure({ adapter: new Adapter() });


describe("Test of TopBar component", () => {
    let wrapper: any;
    const props = {
        asGrid: true,
        setAsGrid: jest.fn(),
        setShowGenSelection: jest.fn(),
        showGenSelection: false,
        setShowTypeSelection: jest.fn(),
        showTypeSelection: false,
        showSorting: false,
        setShowSorting: jest.fn()
    }
    const mockStore = configureStore([thunk]);
    const store = mockStore({
        searchInput: searchReducer
    })
    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <TopBar {...props}/>
            </Provider>
        )
    })

    it("renders", () => {
        expect(wrapper).not.toBeNull()
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it("options button work as intended", () => {
        const button = wrapper.find("div.advanced").find("button")
        expect(button).not.toBeNull()
        button.simulate('click')
        expect(props.setShowSorting).toHaveBeenCalled()
        expect(props.setShowGenSelection).toHaveBeenCalled()
        expect(props.setShowTypeSelection).toHaveBeenCalled()
    })

    it("changes from grid to list view", () => {
        const svgButton = wrapper.find("div.list-grid-swap").find("svg.active")
        svgButton.simulate("click")
        expect(props.setAsGrid).toHaveBeenCalled()
    })

    it("dispatches partial search to redux-store correctly", () => {
        const searchField = wrapper.find("input")
        expect(searchField).not.toBeNull()
        searchField.simulate("change", {target: {value: "cu"}})
        const actions = store.getActions()
        const expectedPayload = {type: "searchInput/addInput", payload: "cu"}
        expect(actions).toEqual([expectedPayload])
    })

})