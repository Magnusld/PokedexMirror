# ReactPokedex


### Oppsett av prosjekt
Informasjon om hvordan man setter opp prosjektet lokalt ligger i de indre README.md filene under frontend og backend. Dette gjelder også kjøring av testene, både komponent/enhets tester og end-2-end testene.


## Frontend

### Innhold
Prosjektet består av to sider. En for listen med pokemon som hentes fra API, og en for mer informasjon om en pokemon man trykker på. Når størrelsen på siden er større enn en typisk mobilstørrelse, kan man endre utsende på listen. Du kan enten velge en liste som bare ligger vertikalt eller en som ligger i et grid både horisontalt og vertikalt. På listesiden har man muligheten for å filtrere og sortere. Dette kan gjøres ved å trykke på "Innstillinger" og deretter endre sortering og filtrering. For filtrering kan man velge generasjoner eller typer. Ved sortering kan man velge mellom å sortere på pokemon-nr. eller pokemon-navn. Til høyre i navigasjonen kan man søke på pokemon-navn. Denne oppdaterer hele siden ved hvert tegn som skrives, slik at brukeren kjapt får pokemons han/hun leter etter.


### Npm biblioteker
ReduxJs Toolkit og React-redux
Gir Redux ekstra funksjonalitet for enklere bruk. I prosjektet brukes spesifikt “slices” for å kunne dele opp “reducers”. Må skrive litt mer kode men, mye enklere å bruke når det fungerer.
Vi valgte å bruke Redux ettersom det er det mest brukte state management biblioteket for react applikasjoner, i tillegg til at medlemmer på gruppa hadde erfaringer med dette fra før av.
For oppsettet av redux ved hjelp av reduxJs toolkit har vi fulgt en guide på reduxJs sin hjemmeside som dere kan se her[ https://redux-toolkit.js.org/tutorials/typescript ]

Vi har valgt å bruke redux state til å lagre all info angående valg av filtrering, partiell søk og sortering, slik at dette skal være persistent i mens man klikker seg gjennom sidene, eller går inn på en informasjonsside om en pokemon.


#### Apollo Client
Client delen av apollo som brukes i backend. Gir oss ekstra funksjonalitet gjennom hooks som useQuery og useMutations. Dette gjør bruken av GraphQL i react mye enklere. Det inneholder automatisk caching av queries for raskere innhenting av data.

#### React Router
Gir mulighet for å navigere i react applikasjoner/nettsider. Den sjekker mot path i url og sender bruker til rett plass. I prosjektet vårt brukes det for å sende brukeren til en ny side for mer informasjon en valgt pokemon. Vi gir altså inn id’en til valgt pokemon, som da blir tatt imot i Info.tsx siden.

#### React Bootstrap og andre tredjeparts komponenter
Et bibliotek med React komponenter. Vi har i all hovedsak laget komponenter selv, men har brukt bootstrap komponenter for knapper, og dropdown valg til sortering. I tillegg bruker vi noen enkeltkomponenter som f.eks. react-simple-star-rating for å unngå unødvendig arbeid på relativt enkle usecases.

## Backend

OBS: Pokemons fra generasjon 8 har ingen tilsvarende bilder, derfor vil disse være blanke.

Prisma ORM og Nexus for generering av skjema, som kjører på Apollo server.
Prisma og Nexus-komboen ble valgt, siden dette lot oss generere mesteparten av koden for
kjøring av queries, samt ekstra funksjonalitet som paginering og filtrering, slik at vi
kunne spare tid som vi trengte til å implementere andre (og mer krevende) resolvers. Tiden
vi sparte gjorde det også mulig å bruke mer tid på å hente inn et ordentlig datasett med
tilhørende bilder, noe som etter vårt syn har forbedret sluttproduktet betraktelig.

Dette fungerer ved at prisma/schema.prisma og src/schema.ts blir definert av utvikleren, hvorpå
Prisma og Nexus deretter genererer resolvers, databaseskjema og ev. oppretter databasen. Etter dette
er det mulig for utvikleren selv å definere egne resolvers, eller extende de genererte funksjonene.

Vi valgte å bruke Sqlite, som Prisma har som default, rett og slett fordi det i den skalaen
det er snakk om, ***"low/medium traffic web servers ... any site that gets fewer than 100K hits/day should work fine with SQLite"***,
ikke er behov for noen egen databaseinstans.

Datasettet består av alle pokemon opp til og med generasjon 8 (ca. 900, noen "ekstra varianter" er med),
med informasjon som navn, type(r), høyde, vekt og ulike datapunkter som blir brukt i spillene på GB/DS/Switch.
Bildene er hentet fra [Bulbagarden](https://bulbapedia.bulbagarden.net/wiki/Main_Page)
via [github.com/fanzeyi](https://github.com/fanzeyi/pokemon.json), datasett fra [Kaggle](https://www.kaggle.com/mariotormo/complete-pokemon-dataset-updated-090420)


## Testing
### Frontend
#### Komponenttester
Vi har valgt å ikke legge veldig mye vekt på komponenttester, men heller fokusere mesteparten av testingen vår på end-2-end tester, også kjent om integrasjonstester. Vi valgte å gjøre dette ettersom det ikke er vanlig å ha stor grad av komponenttester i react, og at man får testet en mye større del av applikasjonen for mindre dedikert tid ved hjelp av end-2-end testing. Vi har dog to komponenttester som tester de mest essensielle komponentene i applikasjonen; liste og listing komponentene. Komponenttestene inneholder også snapshot tester.

#### End-2-End testing
Denne testingen gjøres i frontend med biblioteket cypress. Dette biblioteket lar oss automatisk kjøre integrasjonstester mot frontend. Vi har gjort det slik at frontend er koblet mot backend når testene kjøres, slik at man får gode end-2-end tester. Testene er basert på hvordan en tenkt bruker kunne interagert med nettsiden. Disse testene tester deler av både frontend og backend. Frontend ved at alle elementer og komponenter oppfører seg rett ved å trykke på forskjellige elementer. Backend skjer implisitt ved at queries kjøres ved endring av frontend.
### Backend
Enhetstesting ble nedprioritert i backend av den enkle grunn at mesteparten av koden som kjører "live" er generert,
og at det derfor er rimelig å anta at genereringskoden er testet av utgiver. Det er noe egen logikk, men dette er
av ganske enkelt art, og vi mener derfor at eksisterende e2e-tester dekker testbehovet for nå.

