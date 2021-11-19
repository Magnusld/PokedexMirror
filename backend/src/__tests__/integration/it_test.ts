import {createTestContext} from "./__helpersTestEnvironment";
import {gql} from "graphql-request";

jest.setTimeout(30000);

const ctx = createTestContext();

test("CreateRatingMutation should return correct data and persist on server", async () => {


    const result = await ctx.client.request(
        gql`mutation CreateRating($data: RatingCreateInput!) {
            CreateRating(data: $data) {
                id
                pokemonId
                ratedPokemon { id name }
                userGuid
            }
        }`,
        {
            data: {
                pokemonId: 1,
                userGuid: "testrating for pokemon1",
                rating: 5,
            }
        }
    );
    expect(result).toMatchSnapshot();

    const persistedData = await ctx.db.pokemonRating.findMany();
    expect(persistedData).toMatchSnapshot();
});

test("ChangeRatingMutation should return correct data and persist on server", async () => {

    const newRating = 3

    const beforeChange = await ctx.db.pokemonRating.findMany()
    expect(beforeChange.length).toBe(1)
    const preSeededRating = beforeChange[0]
    expect(preSeededRating.rating).toBe(5)
    const result = await ctx.client.request(
        gql`mutation ChangeRating($data: RatingUpdateInput!) {
            ChangeRating(data: $data) {
                id
                pokemonId
                rating
                ratedPokemon {
                    id
                }
            }
        }`,
        {
            data: {
                ratingToUpdate: {
                    pokemonId: 0,
                    userGuid: "testGuid"
                },
                newRating: newRating
            }
        }
    );
    expect(result).toMatchSnapshot()

    const afterChange = await ctx.db.pokemonRating.findMany()
    expect(afterChange.length).toBe(1)
    expect(afterChange).toMatchSnapshot()

    const changedRating = afterChange[0]
    expect(changedRating.rating).toBe(newRating)
});