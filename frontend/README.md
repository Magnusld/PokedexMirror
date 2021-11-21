# ReactPokedex - frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## End-to-end Testing
NB: For at testingen skal fungere må instruksjonene nedenfor følges nøye

For å kjøre end-to-end testene med cypress.io må man ha en fungerende frontend og backend av appen.
### Frontend
Kjør kommandoene i terminal:
```
cd frontend
npm install
npm start
```
### Backend
For å sette opp backend må man ha to databaser (.db filer)
1. Database som er omtrent identisk som den installert på VM
2. En mocked database med 2 pokemon

#### Oppsett og migrations av databasene
NB: Alle kommander nevnt nedenfor skal kjøres i /backend: `cd backend`, **unntatt når cypress skal åpnes**

**Sette opp backend:**
```
npm install
```

**Vanlig database:**
```
npm run init
npm run seed
```

**Mocked database:**
Trenger ikke å initialiseres på forhånd

### Cypress
For å åpne Cypress.io, kjør denne kommandoen i **/frontend** `cd frontend`:
`npx cypress open`
NB: Hvis du ikke har cypress installert fra før kan du få noen spørsmål om installeringen

#### VIKTIG OM TESTENE!
Testene ligger i to forskjellige mapper og vil bare fungerer hvis rett backend kjører lokalt

**For testene i 1-test-pages:**
Kjør den vanlige databasen med kommandoen: `npm run dev`

**For testen i 2-test-pages-mockup:**
For **hver gang** du kjører `info_page_mockuck_spec.ts`, kjør mocked database med `npm run dev:test` i terminal/kommandolinje først
