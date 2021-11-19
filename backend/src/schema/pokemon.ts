import {objectType} from "nexus";
import {getRatingsForPokemon} from "../resolvers/PokemonRating";

export const Pokemon = objectType({
    name: 'Pokemon',
    definition(t) {

        t.nonNull.int('id');
        t.nonNull.int('pokedexNr');
        t.nonNull.string('name');
        t.nonNull.int('generation');
        t.nonNull.string('species');
        t.nonNull.string('type1');
        t.string('type2');
        t.float('heightMeter');
        t.float('weightKg');
        t.nonNull.int('hp');
        t.nonNull.int('attack');
        t.nonNull.int('defense');
        t.nonNull.int('sp_attack');
        t.nonNull.int('sp_defense');
        t.nonNull.int('speed');
        t.string('ability1');
        t.string('ability2');
        t.string('ability3');
        t.field('aggregated_rating', {
            type: "Float",
            resolve: (source, args, context) => {
                return getRatingsForPokemon(context, source)
                    .then(ratings => {
                        const numberOfRatings = ratings.length;
                        if (numberOfRatings <= 0) return 0;
                        const total = ratings
                            .map(entry => entry.rating)
                            .reduce((accumulator, currentValue) => accumulator + currentValue);
                        return total / numberOfRatings;
                    });
            }
        });
    }
});