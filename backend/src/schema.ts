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
        t.crud.pokemon()
        t.crud.pokemons({
            pagination: true,
            filtering: true,
            ordering: true,
        })
    }
});

/*

const Mutation = objectType({

    name: 'Mutation',
    definition: t => {
        t.crud.createOnePokemon();
        //Mutations skrives inn her:
}
});
*/

export const schema = makeSchema({
    types: [
        //Mutation,
        Query,
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
