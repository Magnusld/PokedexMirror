 # Backend
 ## Stack
Prisma ORM håndterer alle queries og kommunikasjon med underliggende database.
Nexus genererer i lag med Prisma graphql-skjema og resolvers som er definert
i schema.ts

Kjører på Apollo server.
 ## Kommandoer
 For kjøring lokalt, kjør følgende kommandoer i rekkefølge fra ./backend
 ### `npm install`
Installerer nødvendige dependencies og genererer skjema
 ### `npm run init`
Initialiserer sqlite-db.
 ### `npm run seed`
Leser inn data fra ./data/PokemonData.csv og legger dette i db.
 ### `npm run dev`
Starter server i dev-modus, hvor det er mulig å selv kjøre queries
i Apollo sin playground.

 ### `npm run test`
Kjører både enhetstester og integrasjonstester vha. jest.

 ### `npm run test:unit`
Kjører tester under `__tests__/unit`.

 ### `npm run test:integration`
Kjører tester under `__tests__/integration`.
Merk at integrasjonstestene tar en del lengre tid sammenlignet
med enhetstestene, siden en serverinstans må spinnes opp for hver
av testene med nytt db-skjema. Utgreies i [dokumentasjon](../README.md)
