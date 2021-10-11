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
    }
});

const Query = queryType( {
    definition: t => {
        // allPokemon
        t.nonNull.list.nonNull.field('allPokemon', {
            type: 'Pokemon',
            resolve: (_parent, _args, ctx: Context) => {
                return ctx.prisma.pokemon.findMany()
            }

        });

        // pokemonsByGeneration
        // pokemonByNatDex
        // pokemonBy
        //
        //


    }
});

/*

const Mutation = objectType({

    name: 'Mutation',
    definition: t => {

        //Mutations skrives inn her:

}
});
*/

const SortOrder = enumType({
    name: 'SortOrder',
    members: ['asc', 'desc'],
})


export const schema = makeSchema({
    types: [
        //Mutation,
        Query,
        SortOrder,

        Pokemon,
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
