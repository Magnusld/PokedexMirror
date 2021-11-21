import {arg, inputObjectType, nonNull, objectType} from "nexus";
import {createPokemonRating, updatePokemonRating} from "../resolvers/PokemonRating";

export const Mutation = objectType({

    name: 'Mutation',
    definition: t => {

        t.field('CreateRating', {
            type: 'PokemonRating',
            args: {
                data: nonNull(
                    arg({
                        type: RatingCreateInput,
                    })
                )
            },
            resolve: (source, args, context) => {
                return createPokemonRating(context, args);
            }
        });

        t.field('ChangeRating', {
            type: 'PokemonRating',
            args: {
                data: nonNull(
                    arg({
                        type: RatingUpdateInput
                    })
                )
            },
            resolve: (source, args, context) => {
                return updatePokemonRating(context, args);
            }
        });

        t.crud.deleteOnePokemonRating();
    }
});

export const RatingCreateInput = inputObjectType({
    name: 'RatingCreateInput',
    definition(t) {
        t.nonNull.int('pokemonId');
        t.nonNull.string("userGuid");
        t.nonNull.int('rating');
    }
});

export const RatingWhereInput = inputObjectType({
    name: 'RatingWhereInput',
    definition(t) {
        t.nonNull.int('id');
    }
});

export const RatingUpdateInput = inputObjectType({
    name: 'RatingUpdateInput',
    definition(t) {
        t.nonNull.field('ratingToUpdate', {type: RatingWhereInputGuidId});
        t.nonNull.int('newRating');
    }
});

export const RatingWhereInputGuidId = inputObjectType({
    name: "RatingWhereInputGuidId",
    definition(t) {
        t.nonNull.int("pokemonId");
        t.nonNull.string("userGuid");
    }
});