import {createTestContext} from "./__helpersTestEnvironment";
import {gql} from "graphql-request";


jest.setTimeout(20000);
const ctx = createTestContext();

/*
* Ingen mutations på pokemon-tabell, siden brukere ikke skal kunne lage nye.
* Her er vi kun interessert i snapshottesting, for å sikre at samme queries
* representeres på samme hvis hver gang, samt at den aggregerte ratingen også reflekteres
*/

test("queries to Pokemon should match snapshots", async () => {
    const query = gql`query Pokemons($orderBy: [PokemonOrderByInput!], $first: Int) {
        pokemons(orderBy: $orderBy, first: $first) {
            __typename
            id
            pokedexNr
            name
        }
    }`;
    const resultAscSorted = await ctx.client.request(
        query, {orderBy: [{pokedexNr: "asc"}], first: 15}
    );
    expect(resultAscSorted.pokemons.length).toBe(2);
    expect(resultAscSorted).toMatchSnapshot();

    const resultDescSorted = await ctx.client.request(
        query, {orderBy: [{pokedexNr: "desc"}], first: 15}
    );

    expect(resultDescSorted.pokemons.length).toBe(2);
    expect(resultDescSorted).toMatchSnapshot();
});

test("changes in rating should reflect on the aggregated ratings field", async () => {
    const query = gql`query Pokemon($where: PokemonWhereUniqueInput!) {
        pokemon(where: $where) {
            id
            aggregated_rating
        }
    }`;

    const testQuery1Before = await ctx.client.request(query, {where: {id: 0}});
    expect(testQuery1Before.pokemon.aggregated_rating).toBe(5);

    // Updating rating and check if the aggregated field on pokemon is still correct
    await ctx.db.pokemonRating.update({where: { id: 0}, data: { rating: 2 }});

    const testQuery1After = await ctx.client.request(query, {where: {id: 0}});
    expect(testQuery1After.pokemon.aggregated_rating).toBe(2);

    /* now testing created ratings, as pokemon2 does not have any ratings from before in
    the test dataset */
    const testQuery2Before = await ctx.client.request(query, {where: {id: 1}})
    expect(testQuery2Before.pokemon.aggregated_rating).toBe(0)

    // creating new rating, aggregated rating should now be 5
    await ctx.db.pokemonRating.create({data: {id: 1, pokemonId: 1, rating: 5,userGuid: "itGuid"}})
    const testQuery2After = await ctx.client.request(query, {where: {id: 1}})
    expect(testQuery2After.pokemon.aggregated_rating).toBe(5)
});