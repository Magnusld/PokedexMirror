import {Context} from "../context";
import {ArgsValue, SourceValue} from "nexus/dist/typegenTypeHelpers";


export function createPokemonRating(ctx: Context, args: ArgsValue<any, any>) {
    return ctx.prisma.pokemonRating.create({
        data: {
            pokemonId: args.data.pokemonId,
            rating: args.data.rating,
            userGuid: args.data.userGuid
        }
    })
}

export function updatePokemonRating(ctx: Context, args: ArgsValue<any, any>) {
    return ctx.prisma.pokemonRating.update({
        where: {
            userGuid_pokemonId: {
                userGuid: args.data.ratingToUpdate.userGuid,
                pokemonId: args.data.ratingToUpdate.pokemonId
            }
        },
        data: {
            rating: args.data.newRating
        }
    })
}

export function getRatingsForPokemon(ctx: Context, source: SourceValue<any>) {
    return ctx.prisma.pokemonRating.findMany({
        where: {
            pokemonId: source.id
        }
    })
}