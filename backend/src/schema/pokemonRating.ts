import {objectType} from "nexus";
import {getPokemon} from "../resolvers/Pokemon";

export const PokemonRating = objectType({
    name: 'PokemonRating',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.int('pokemonId');
        t.nonNull.string("userGuid");
        t.field('ratedPokemon', {
            type: 'Pokemon',
            resolve: (source, _, context) => {
                return getPokemon(context, source);
            }
        });
        t.nonNull.float("rating");
    }
});