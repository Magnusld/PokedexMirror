import {Context} from "../context";
import {SourceValue} from "nexus/dist/typegenTypeHelpers";

export function getPokemon(ctx: Context, source: SourceValue<any>) {
    return ctx.prisma.pokemon
        .findUnique({
            where: {
                id: source.pokemonId
            }
        })
}