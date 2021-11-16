// tests/__helpers.ts
import {PrismaClient} from "@prisma/client";
import {ApolloServer, ServerInfo} from "apollo-server";
import {execSync} from "child_process";
import getPort, {makeRange} from "get-port";
import {join} from "path";
import {GraphQLClient} from "graphql-request";
import {apolloServer} from "../../server";
import {context} from "../../context";

type TestContext = {
    client: GraphQLClient;
    db: PrismaClient;
};

let prismaCli: PrismaClient;

export function createTestContext(): TestContext {
    let ctx = {} as TestContext;
    const graphqlCtx = graphqlTestContext();
    const prismaCtx = prismaTestContext();
    beforeEach(async () => {
        const client = await graphqlCtx.before();
        const db = await prismaCtx.before();
        await seedForTesting(db);
        Object.assign(ctx, {
            client,
            db,
        });
    });
    afterEach(async () => {
        await graphqlCtx.after();
        await prismaCtx.after();
    });
    return ctx;
}

function graphqlTestContext() {
    let serverInstance: ServerInfo | null = null;
    let apolloInstance: ApolloServer | null = null
    return {
        async before() {
            apolloInstance = apolloServer()
            serverInstance = await apolloInstance.listen(
                {
                    port: await getPort(/*{port: makeRange(4000, 6000)}*/)
                });
            // Close the Prisma Client connection when the Apollo Server is closed
            serverInstance.server.on("close", async () => {
                await prismaCli.$disconnect()
                await context.prisma.$disconnect()
            });
            return new GraphQLClient(`http://localhost:${serverInstance.port}`);
        },
        async after() {
            serverInstance?.server.close();
            await apolloInstance?.stop()
        },
    };
}

function prismaTestContext() {
    let prismaClient: null | PrismaClient = null;
    return {
        async before() {
            // Run the migrations to ensure our schema has the required structure
            execSync(`npm run test:migrate`);
            // Construct a new Prisma Client connected to the generated schema
            prismaClient = new PrismaClient({
                datasources: {
                    db: {
                        url: `file:./test.db`,
                    },
                },
            });
            prismaCli = prismaClient
            return prismaClient;
        },
        async after() {
            // Drop the schema after the tests have completed
            execSync(`npm run test:migrate:reset`);
            // Release the Prisma Client connection
            await prismaClient?.$disconnect();
        },
    };
}

async function seedForTesting(db: PrismaClient) {
    await db.pokemon.create(pokemon1);
    await db.pokemon.create(pokemon2);
}

const pokemon1 = {
    data: {
        id: 0,
        name: "TestPokemon1",
        generation: 1,
        pokedexNr: 5,
        hp: 5,
        attack: 5,
        sp_attack: 5,
        defense: 5,
        sp_defense: 5,
        speed: 5,
        ability1: "TestAbility1",
        ability2: "TestAbility2",
        ability3: "TestAbility3",
        species: "",
        type1: "Fire",
        type2: "Flying",
        heightMeter: 5,
        weightKg: 5,
    }
};

const pokemon2 = {
    data: {
        id: 1,
        name: "TestPokemon2",
        generation: 6,
        pokedexNr: 1,
        hp: 5,
        attack: 5,
        sp_attack: 5,
        defense: 5,
        sp_defense: 5,
        speed: 5,
        ability1: "TestAbility1",
        ability2: "TestAbility2",
        ability3: "TestAbility3",
        species: "",
        type1: "Grass",
        type2: undefined,
        heightMeter: 5,
        weightKg: 5,
    }
};