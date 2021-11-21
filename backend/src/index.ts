import {apolloServer} from "./server";
import {execSync} from "child_process";
import {seedTestData} from "./util/seedTestData";


async function main() {
    // If testing, reset and prepare test.db beforehand
    if (process.env.NODE_ENV === "test") {
        console.log("Launching dev in test mode, please wait");
        execSync("npm run test:migrate:reset");
        execSync("npm run test:migrate");
        await seedTestData();
    }

    // Launch server
    apolloServer().listen().then(async ({url,server}) => {
        console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `);
    });
}

main();

