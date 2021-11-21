import {makeSchema} from 'nexus';
import {nexusPrisma} from 'nexus-plugin-prisma';
import {Context} from './context';
import pluralize from "pluralize";
import {Mutation, RatingCreateInput, RatingWhereInput, RatingWhereInputGuidId} from "./schema/mutation";
import {Pokemon} from "./schema/pokemon";
import {Query} from "./schema/query";
import {PokemonRating} from "./schema/pokemonRating";

// Fix for duplikat, noe fra nexus-plugin-prisma
pluralize.addIrregularRule("pokemon", "pokemons");
pluralize.addIrregularRule("pokemonRating", "pokemonRatings");

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
