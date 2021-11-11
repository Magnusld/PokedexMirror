import {MockContext, Context, createMockContext} from '../context';
import {createPokemonRating, getRatingsForPokemon, updatePokemonRating} from "../resolvers/PokemonRating";
import {NexusGenObjects} from "../generated/nexus";
import {getPokemon} from "../resolvers/Pokemon";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
});

test("should perform a cal to create a new rating", async () => {

    const newRating: NexusGenObjects["PokemonRating"] = {
        id: 0,
        pokemonId: 0,
        rating: 5,
        userGuid: "test",
    };
    mockCtx.prisma.pokemonRating.create.mockResolvedValue(newRating);
    await expect(createPokemonRating(ctx, { // På grunn av typegen må input til prisma være på eksakt format
        data: { // input type
            pokemonId: newRating.pokemonId,
            rating: newRating.rating,
            userGuid: newRating.userGuid
        }
    })).resolves.toEqual({
        id: 0,
        pokemonId: 0,
        rating: 5,
        userGuid: "test",
    });

});

test("should perform a call to update a rating", async () => {
    const updateRating: NexusGenObjects["PokemonRating"] = {
        id: 0,
        pokemonId: 0,
        rating: 5,
        userGuid: "test",
    };
    mockCtx.prisma.pokemonRating.update.mockResolvedValue(updateRating);
    await expect(updatePokemonRating(ctx, {
        data: {
            ratingToUpdate: {
                userGuid: "test",
                pokemonId: 0,
                rating: 5,
            }
        }
    })).resolves.toEqual({
        id: 0,
        pokemonId: 0,
        rating: 5,
        userGuid: "test",
    });

});

test("should perform a call to findMany on Pokemon", async () => {
    const ratings = [{pokemonId: 0, rating: 5, userGuid: "",id: 0}]
    mockCtx.prisma.pokemonRating.findMany.mockResolvedValue(ratings)
    await expect(getRatingsForPokemon(ctx, {
        id: 0
    })).resolves.toEqual(
        ratings
    )
})

test("should perform a call to get a pokemon", async () => {
    const pokemonDummy = {
        id: 0, hp: 0, attack: 0, sp_attack: 0, defense: 0, sp_defense: 0, speed: 0, generation: 0, pokedexNr: 0,
        name: "", ability1: "", ability2: "", ability3: "", species: "",type1: "",type2: "",
        heightMeter: 0, weightKg: 0,
    }
    mockCtx.prisma.pokemon.findUnique.mockResolvedValue(pokemonDummy)

    await expect(getPokemon(ctx, pokemonDummy)).resolves.toEqual(pokemonDummy)
})