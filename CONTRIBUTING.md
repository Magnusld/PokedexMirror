# Utvikling og bidrag

## Sprintplanlegging

Hver sprint blir satt opp som en milepæl på gitlab.
På sprintplanleggingen blir brukerhistorier for perioden valgt ut og omgjort til oppgaver (GitLab issues).
Inndelingen er slik at hver oppgave blir så individuell som mulig, men likevel implementerer en konkret kodebit.
Oppgaven får en merkelapp med brukerhistorien, og blir tilordnet sprint-milepælen.

En sprint kan også inneholde oppgaver fra etterslep-lista, selv om de ikke hører til en brukerhistorie.
Etterslep-lista består av alle oppgaver som ikke er tilordnet milepæl, og utviklere
kan når som helst legge til nye oppgaver på etterslep-lista.

### Utvikling

Hver oppgave skal på dette stadiet være et tenkt konkret stykke arbeid.
Dette arbeidet skal skje i en egen gren i git, og det skal skrives både tester og
eventuell dokumentasjon. Man trenger ikke dogmatisk følge testdrevet utvikling,
men all kode som skal inn i prosjektet skal ha enhetstester.
I tillegg skal man forsøke å ha integrasjonstester for testing av APIer, både
på klient og tjener. Integrasjonstester betyr her tester som starter programmet
for å intragere med det, men som kun simulerer kommunikasjon mellom klient og tjener.

For hver oppgave har GitLab et forslag til gren-navn på formen
```
71-vurdere-om-vi-skal-kreve-oppgave-nummer-i-buntmeldinger
```
Denne blir fort litt lang, men så lenge oppgavenummeret er med på starten
vil GitLab forstå at grenen hører til oppgaven når tiden er inne for fletting.
I tillegg skal alle kodebunter være navngitt deskriptivt etter reglene i
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
Dette vil si at alle buntmeldinger er på formen
```
feat(#43): legge til statuslinje for nettverksoprasjoner

Beskrivelse av forandringen, kun dersom det trengs.
Inni parantesen skrives oppgavenummeret bunten jobber mot.
Merk at resten av linjen er i infinitiv, har liten forbokstav og er uten tegnsetting.
Linjen skal passe inn i setningen:
  
  Hvis denne bunten flettes inn i kodebasen vil den <melding>.
  
BREAKING CHANGES: ødelegger funksjonalitet og må derfor ha denne linjen
```
Vi holder oss til de definerte engelske nøkkelordene for maskinlesbarheten sin del:

`feat`, `fix`, `chore`, `build`, `test`, `refactor`, `perf`, `style`, `ci`, `docs`.

Bunter med automatiske meldinger (`revert `, `merge `) trenger ikke følge reglene.



# Språk

Vi bruker norsk som språk på GitLab og i dokumentasjon, og nynorsk og bokmål er sidestilt.
Variabelnavn og kommentarer i kode er på engelsk, og i noen *få* tilfeller brukes engelske ord
der det ikke er enighet om norske utgaver. Forslag:

 - issue -> **oppgave** (issue task list kalles **underoppgaver**)
 - tag -> **git-merkelapp**
 - label -> **GitLab-merkelapp**
 - commit -> **bunt**
 - merge request -> **fletteforespørsel**
 - merge -> **sammenflette**
 - rebase -> **lempe om**
