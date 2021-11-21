# ReactPokedex 


### Oppsett av prosjekt
Informasjon om hvordan man setter opp prosjektet lokalt ligger i de indre README.md filene under frontend og backend. Dette gjelder også kjøring av testene, både komponent- og enhetstester, samt end-2-end tester.

### Informasjon prosjekt 4
Etter 1. november 2021 starter issues og merge requests på #1 og !1 igjen, derfor da også commits og branches.

# Prosjekt 4
For prosjekt 4 valgte vi oppgave b., enhets- og integrasjonstesting i frontend og backend.

## Frontend:
Her har det vært mest fokus på testing, men også noen forbedringer.
Forbedringer
Siden for mer info om valgt pokemon fikk noen endringer. Øverst på siden er det lagt til en tilbake-knapp. I tilbakemelding fra prosjekt 3 var dette noe flere mente kunne vært forbedret. En slik knapp er også noe som har blitt vanligere i moderne websider og apper. 
På denne siden endret vi også hvordan vurderinger av pokemon fungerer. Før måtte man “refreshe” siden for å kunne se sin vurdering reflektert i “andres vurdering”. Nå oppdateres dette med en gang man endrer sin egen vurdering. 


### Testing
For å gjøre testing i frontend har vi for det meste brukt Jest, React testing library, Enzyme og noen mindre bibliotek for testing: Redux-mock-store, react-test-renderer. Vi testet de viktigste komponentene og sidene, og viktig funksjonalitet som konvertering av liste med pokemontyper til ikoner. I Enhetstestene har vi testet de komponentene og funksjonen vi har lagd selv, det blir dog brukt en del tredjepartsbibliotek noe som fører til at test-dekningsgraden ikke blir 100 av enhetstestene.


#### Enzyme
Enzyme er et react test utility bibliotek laget av AirBnB. Vi bruker det for å enklere kunne mounte og simulere bruker interaksjon i enhetstester. 

### Cypress
Her ble det lagt til enda flere tester. Disse testet spesifikt funksjonaliteten til sortering, paginering og rating av pokemon. Det er også laget noen tester som bruker en mocked database lokalt i backend. Den brukes for det meste til å teste rating av pokemon, slik at man får samme resultat hver gang testen kjøres. Databasen må da altså restartes hver gang testing av mocked datasett skal gjøres. Grunnen til at vi bruker enda flere end-to-end tester er fordi vi føler de er veldig verdifulle tester. Dette fordi vi får testet hvordan nettsiden virker utad til brukeren, men også at alt “under panseret” fungerer på rett måte. 


## Backend:
I backend bruker vi jest for både enhetstesting og integrasjonstester. Enhetstestingen er ikke spesielt omfattende, mye fordi koden som faktisk kjører er generert, og denne vil selv håndtere feil, som f.eks. dårlig utformede queries mot endpoint eller feil typer på args. 

Enhetstestene består derfor i hovedsak av at kall/svar fra database blir mocket, og at tilsvarende resolvers bruker riktig kall mot database og videreformidler svaret uten feil. Hvis vi hadde flere domenespesifikke begrensninger (som ikke databasen håndterer) som ble enforcet av server, kunne en annen ting vi burde teste her være hvorvidt logikken fanger opp disse tilfellene og returnerer riktig på bakgrunn av dette. Et eksempel ville vært vurderingsfeaturen i frontend, hvor vi per nå ikke har noen begrensning på tallet som kan settes på en vurdering, men siden fokuset var på å skrive og ev. forbedre eksisterende tester for dette prosjektet, så ble dette nedprioritert.

Hver av integrasjonstestene kjører opp en egen instans av serveren samt en egen sqlite-databasefil for å teste at queries gir forventet svar med samme datasett. Videre er det også tester som skal sikre at riktig utformede mutations endrer eller legger til nye entries med korrekt data, samt at disse endringene faktisk blir lagret i database, og ikke kun i minne på server.

En av utfordringene vi ikke fikk løst direkte med testing i backend er at integrasjonstestene per nå må kjøres sekvensielt. Dette fordi vi ikke fant en god løsning for vårt valg av ORM, Prisma, og sqlite som database. Kort forklart så gjør måten Prisma fungerer på sammen med sqlite det vanskelig å kjøre opp parallelle serverinstanser med forskjellige skjemaer slik vi løste det i prosjekt 3, og med tiden vi hadde til disposisjon valgte vi heller å fokusere på å få på plass tester. Siden hver av testene initialiserer en egen server som også må avsluttes på korrekt vis, så gjør det at alle testene per nå tar ca. 50 sekunder (testet på stasjonær workstation), mot forventet kjøretid på 15-16 sekunder hvis testene kunne kjørt parallelt. En av løsningene som ble sett på var å bytte til en full database, f.eks. SQL Server, hvor parallelle skjemaer ville vært enklere å benytte, men igjen på grunn av tid, så valgte vi å beholde løsningen vi allerede hadde.

I tillegg til testing, så har også koden i backend blitt omstrukturert for bedre lesbarhet og oversikt, men funksjonelt identisk med backend for prosjekt 3, og derfor er det heller ikke blitt deployet noen ny backend på VM.


# Prosjekt 3

## Frontend

### Innhold
Prosjektet består av to sider. En for listen med pokemon som hentes fra API, og en for mer informasjon om en pokemon man trykker på. Når størrelsen på siden er større enn en typisk mobilstørrelse, kan man endre utsende på listen. Du kan enten velge en liste som bare ligger vertikalt eller en som ligger i et grid både horisontalt og vertikalt. På listesiden har man muligheten for å filtrere og sortere. Dette kan gjøres ved å trykke på "Innstillinger" og deretter endre sortering og filtrering. For filtrering kan man velge generasjoner eller typer. Ved sortering kan man velge mellom å sortere på pokemon-nr. eller pokemon-navn. Til høyre i navigasjonen kan man søke på pokemon-navn. Denne oppdaterer hele siden ved hvert tegn som skrives, slik at brukeren kjapt får pokemons han/hun leter etter.


### Npm biblioteker

#### ReduxJs Toolkit og React-redux
Gir Redux ekstra funksjonalitet for enklere bruk. I prosjektet brukes spesifikt “slices” for å kunne dele opp “reducers”. Må skrive litt mer kode men, mye enklere å bruke når det fungerer.
Vi valgte å bruke Redux ettersom det er det mest brukte state management biblioteket for react applikasjoner, i tillegg til at medlemmer på gruppa hadde erfaringer med dette fra før av.
For oppsettet av redux ved hjelp av reduxJs toolkit har vi fulgt en guide på reduxJs sin hjemmeside som dere kan se [her](https://redux-toolkit.js.org/tutorials/typescript).

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

## Web accessibility
- For dette prosjektet bruker vi WCAG 2.0-standarden - 1.3.1 Informasjon og relasjoner (Nivå A) - Utforming og presentasjon

### Løsninger som møter kravene i forskriften

#### Skille innhold og presentasjon
Vi benytter en logisk rekkefølge i HTML koden, slik at koden kan brukes på en fornuftig måte av de som skulle trenge det. Søk, filtrering og sortering er plassert øverst. Data presentert i en form for liste i midten. Navigasjon mellom sidene er nederst. Navigering med bare tastatur fungerer også godt (altså med "tab").

#### Helhetlig utforming
Menyer, søkefelt osv. er konsekvent alltid på samme plass slik at det ikke blir noen misforståelser for brukeren.

#### Forstørring
På denne nettsiden fungerer det med forstørring opp til 200%. Alt av tekst og elementer blir da veldig store slik at svaksynte lettere kan se hva som står. Ved slike forstørrelser har man fremdeles tilgang til alt på nettsiden.

#### Bevegelser i grensesnittet
Vi har ingen bevegelser i grensesnittet i mindre brukeren selv scroller opp eller ned, så denne vil ikke gjelde her.
