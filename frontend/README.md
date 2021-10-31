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
For å kjøre end-to-end testene med cypress.io må man ha en fungerende frontend og backend av appen.
### Frontend
Kjør kommandoene i terminal:
```
cd frontend
npm install
npm start
```
### Backend
To måter:
#### Måte 1: Sett VM som backend
I variabelen `httpLink` i `uri:` sett `http://it2810-35.idi.ntnu.no:4000/` som string
- NB: Husk og enten være på NTNU sitt nettverk eller bruk VPN
#### Måte 2: Initialiser backend lokalt og bruk som backend
Start den slik README.md i backend spesifiserer