// tests/__helpers.ts
import {PrismaClient} from "@prisma/client";
import {ApolloServer, ServerInfo} from "apollo-server";
import {execSync} from "child_process";
import getPort, {makeRange} from "get-port";
import {join} from "path";
import {GraphQLClient} from "graphql-request";
import {apolloServer} from "../../server";
import {context} from "../../context";
import {seedForTesting} from "../../util/seedTestData";

/*
Sets up the environment in order to run the integration tests, while also taking care to tear down the
environment and closing/disconnecting all handles.

Built on the example provided by Nexus: https://nexusjs.org/docs/getting-started/tutorial/chapter-testing-with-prisma
 */

type TestContext = {
    client: GraphQLClient;
    db: PrismaClient;
};

export function createTestContext(): TestContext {
    let ctx = {} as TestContext;
    const graphqlCtx = graphqlTestContext();
    const prismaCtx = prismaTestContext();
    beforeAll(async () => {
        execSync("npm run test:migrate:reset")
    })
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

