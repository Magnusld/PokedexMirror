 # Backend
 ## Stack
Prisma ORM håndterer alle queries og kommunikasjon med underliggende database.
Nexus genererer i lag med Prisma graphql-skjema og resolvers som er definert
i schema.ts

Kjører på Apollo server.
 ## Kommandoer
 For kjøring lokalt, kjør følgende kommandoer i rekkefølge fra ./backend
 ### `npm install`
Installerer nødvendige dependencies
 ### `npx prisma migrate dev --name init`
Genererer databaseskjema  + initialiserer sqlite-db.
 ### `npm run seed`
Leser inn data fra .data/PokemonData.csv og legger dette i db.
 ### `npm run dev`
Starter server i dev-modus, hvor det er mulig å selv kjøre queries
i Apollo sin playground.
