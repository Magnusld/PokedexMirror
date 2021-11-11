import { MockContext, Context, createMockContext } from '../context'
import exp from "constants";
import {createPokemonRating} from "../resolvers/PokemonRating";

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

test("should create a new rating", async () => {

    const newRating = {
        id: 0,
        pokemonId: 0,
        rating: 5,
        userGuid: "test",
    }
    const createArgs = { // På grunn av typegen må input til prisma være på eksakt format
        data: { // input type
            pokemonId: newRating.pokemonId,
            rating: newRating.rating,
            userGuid: newRating.userGuid
        }
    }
    mockCtx.prisma.pokemonRating.create.mockResolvedValue(newRating)
    await expect(createPokemonRating(ctx, createArgs)).resolves.toEqual({
        id: 0,
        pokemonId: 0,
        rating: 5,
        userGuid: "test",
    })

})