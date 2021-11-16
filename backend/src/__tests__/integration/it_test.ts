import {createTestContext} from "./__helpersTestEnvironment";
import {gql} from "graphql-request";

jest.setTimeout(30000)

const ctx = createTestContext();

test("test", async () => {
    const result =
    await ctx.client.request(gql`mutation CreateRatingMutation($data: RatingCreateInput!) {
                CreateRating(data: $data) {
                    id
                    pokemonId
                    ratedPokemon {
                        id
                        name
                    }
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
    expect(result).toMatchSnapshot()
});