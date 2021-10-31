import * as ReactDOM from 'react-dom';
import React from "react";
import {ListComponent} from "../components/ListComponent"
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import { store } from '../redux/store'
import {ApolloProvider, ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});


describe("Unit test on the ListComponent component", () => {
    let container: HTMLDivElement;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);

        ReactDOM.render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <ListComponent asGrid={true} />
                </Provider>
            </ApolloProvider>, container)
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.resetAllMocks();
    })

    it("matches snapshot for component", () => {
        const tree = renderer.create(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <ListComponent asGrid={true} />
                </Provider>
            </ApolloProvider>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders listingComponents", ()=> {
        const numberOfListings = container.querySelectorAll("div").length
        expect(numberOfListings).toBeGreaterThan(0)
    })

})