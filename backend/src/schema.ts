import {
    intArg,
    makeSchema,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
    asNexusMethod,
    enumType, queryType,
} from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma'
import {Context} from './context';
import pluralize from "pluralize";

// Fix for duplikat, noe fra nexus-plugin-prisma
pluralize.addIrregularRule("pokemon", "pokemons");
pluralize.addIrregularRule("pokemonRating", "pokemonRatings");

const Pokemon = objectType({
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
                return context.prisma.pokemonRating.findMany({
                    where: {
                        pokemonId: source.id
                    }
                })
                    .then(ratings => {
                        const numberOfRatings = ratings.length
                        if (numberOfRatings <= 0) return 0
                        const total = ratings
                            .map(entry => entry.rating)
                            .reduce((accumulator, currentValue) => accumulator+currentValue)
                        return total / numberOfRatings
                    })
            }
        })
    }
});

const PokemonRating = objectType({
    name: 'PokemonRating',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.int('pokemonId')
        t.nonNull.string("userGuid")
        t.field('ratedPokemon', {
            type: 'Pokemon',
            resolve: (source, _, context) => {
                return context.prisma.pokemon
                    .findUnique({
                        where: {
                            id: source.pokemonId
                        }
                    })
            }
        })
        t.nonNull.float("rating")
    }
})

const Query = queryType( {

    definition: t => {
        t.crud.pokemon()
        t.crud.pokemons({
            pagination: true,
            filtering: true,
            ordering: true,

        })
        t.crud.pokemonRating()
        t.crud.pokemonratings({
            pagination: true,
            filtering: true,
            ordering: true,
        })

    }
});

const Mutation = objectType({

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
                return context.prisma.pokemonRating.create({
                    data: {
                        pokemonId: args.data.pokemonId,
                        rating: args.data.rating,
                        userGuid: args.data.userGuid
                    }
                })
            }
        })

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
                return context.prisma.pokemonRating.update({
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
        })

        t.crud.deleteOnePokemonRating()
    }
});

const RatingWhereInput = inputObjectType({
    name: 'RatingWhereInput',
    definition(t) {
        t.nonNull.int('id')
    }
})

const RatingWhereInputGuidId = inputObjectType( {
    name: "RatingWhereInputGuidId",
    definition(t) {
        t.nonNull.int("pokemonId")
        t.nonNull.string("userGuid")
    }
})

const RatingUpdateInput = inputObjectType({
    name: 'RatingUpdateInput',
    definition(t) {
        t.nonNull.field('ratingToUpdate', {type: RatingWhereInputGuidId})
        t.nonNull.int('newRating')
    }
})

const RatingCreateInput = inputObjectType({
    name: 'RatingCreateInput',
    definition(t) {
        t.nonNull.int('pokemonId')
        t.nonNull.string("userGuid")
        t.nonNull.int('rating')
    }
})


export const schema = makeSchema({
    types: [
        Mutation,
        Query,
        Pokemon,
        PokemonRating,
        RatingCreateInput,
        RatingWhereInput,
        RatingWhereInputGuidId,
    ],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    plugins: [
        nexusPrisma({
            experimentalCRUD: true,
        })
    ],
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
});
