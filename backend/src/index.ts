import {apolloServer} from "./server";

apolloServer().listen().then(async ({url}) => {
    console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `);
});