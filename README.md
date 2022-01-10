# [sep2021-project-koeskoes](https://en.wikipedia.org/wiki/Spilocuscus)

<img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Cuscus1.jpg" alt="koeskoes" width="200"/>

## Opdracht

[Giftle](https://github.com/HANICA-DWA/sep2021-project-koeskoes/blob/main/koeskoes/4.Sprint3/Documentatie/Software%20Guidebook/01_context.md)

## Installatie

Om goed voorbereid te zijn op deze installatie en om de installatie helemaal goed te krijgen, vragen wij je om de volgende installaties alvast te hebben en te checken:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installeer FFmpeg

#### Windows

[FFmpeg installatie Windows](https://www.wikihow.com/Install-FFmpeg-on-Windows)

#### MacOS

[FFmpeg installatie MacOS](https://trac.ffmpeg.org/wiki/CompilationGuide/macOS)

#### Linux - Ubuntu 18.04

[FFmpeg installatie Ubuntu](https://linuxize.com/post/how-to-install-ffmpeg-on-ubuntu-18-04/)

### Project installatie

Nu bovengenoemde software geïnstalleerd is, kunnen wij verder met het installeren van het project Giftle. Om het project Giftle online te zetten klik je op de volgende link: [Giftle online zetten](https://github.com/HANICA-DWA/sep2021-project-koeskoes/blob/main/koeskoes/4.Sprint3/Documentatie/Software%20Guidebook/11_deployment.md).

- Clone deze repository.

- Start mongodb op als dit nog niet gedaan is.

- Open 2 terminals:
  
  - In terminal 1 navigeer naar `/locatie/van/de/repo/sep2021-project-koeskoes/koeskoes/0.Giftle/`
  
  - In terminal 2 navigaar naar `/locatie/van/de/repo/sep2021-project-koeskoes/koeskoes/0.Giftle/Express/`

- In terminal 2 volg de volgende stappen

```
npm i of npm install
node app.js
```

```
Output
Server started on port 4000
```

- Wanneer de Express server is opgestart volg de volgende stappen in terminal 1

```
npm i of npm install
npm start
```

```
Output
Compiled successfully!
```

- Nu zal de React applicatie jouw browser naar keuze openen en naar de volgende pagina navigeren:

`http://localhost:3000/`

- Deze pagina zal een 404 berichten moeten weergeven.

## Beschikbare URL's

Zodra de React applicatie is opgestart kan je naar de volgende URL's navigeren. 

> Alle URL's waar :textCode in staat moet een textCode beschikbaar staan in de database om op deze pagina te komen.

```
http://localhost:3000/checkout
http://localhost:3000/checked-out
http://localhost:3000/magento-checked-out
http://localhost:3000/orderControl/:textCode
http://localhost:3000/buyer/noTextCode - Alleen bereikbaar via de orderControl pagina
http://localhost:3000/buyer - Alleen bereikbaar via de orderControl pagina
http://localhost:3000/buyer/create - Alleen bereikbaar via de orderControl pagina
http://localhost:3000/buyer/thankyou
http://localhost:3000/buyer/watchvideo/:textCode
http://localhost:3000/receiver
http://localhost:3000/receiver/qr-code
http://localhost:3000/receiver/scan
http://localhost:3000/receiver/textcode
http://localhost:3000/receiver/watchvideo/:textCode
http://localhost:3000/receiver/watchSharedVideo/:textCode
http://localhost:3000/receiver/reaction/:textCode
http://localhost:3000/receiver/text-reaction/:textCode
http://localhost:3000/receiver/video-reaction/:textCode
http://localhost:3000/receiver/reaction-sent
http://localhost:3000/receiver/reaction-already-sent
http://localhost:3000/employee/checkorders
```

## Werkende mail server

- Omdat deze applicatie gebruik maakt van de Google SMTP server moet je een Google account hebben met een Google mail.

- Volg vervolgens [deze](https://support.google.com/mail/answer/185833?hl=en) stappen om een `App password` te maken voor de mail.

- Maak een `.env` bestand in de volgende locatie:

`/locatie/van/de/repo/sep2021-project-koeskoes/koeskoes/0.Giftle/Express/`

- Maak vervolgens 2 variabelen aan in dit bestand:

```
EMAILUSERNAME=<Google E-mail>
EMAILPASSWORD=<Google App Password>
```

## Runnen van de testen

> Voor het runnen van de testen gaan wij ervan uit dat de mailserver is ingesteld en deze volledig werkt, ook gaan wij ervan uit dat het .env bestand correct is ingesteld volgens bovenstaande stappen.

#### React testen

- Navigeer naar de map `0.Giftle` als je dat nog niet hebt gedaan:

`/locatie/van/de/repo/sep2021-project-koeskoes/koeskoes/0.Giftle/`

- Voer het volgende commando uit:

```
npm test
```

#### E2E testen

- Navigeer naar de volgende map:

`/locatie/van/de/repo/sep2021-project-koeskoes/koeskoes/0.Giftle/Express/`

- Maak hier de map videos aan als deze nog niet bestaat.

- Plaats in deze map een .mp4 video naar keuze.

- Open de `seed.js` in de Express map

`/locatie/van/de/repo/sep2021-project-koeskoes/koeskoes/0.Giftle/Express/seed.js`

- Plaats in de `insertMany` functie, onder `videoName` de video naam + extensie van de eerder geüploade video 

- Navigeer naar de map `0.Giftle` als je dat nog niet hebt gedaan:

`/locatie/van/de/repo/sep2021-project-koeskoes/koeskoes/0.Giftle/`

- Voer de volgende commando's uit:

```
node ./Express/seed.js
```

```
Output
The seed has successfully been planted
```

```
npm run e2e
```

#### Unit testen

- Navigeer naar de map `Express` als je dat nog niet hebt gedaan:

`/locatie/van/de/repo/sep2021-project-koeskoes/koeskoes/0.Giftle/Express/`

- Open het .env bestand en voeg de volgende regel toe

```
ACCEPTEDVIDEOFORMATS="mp4 mov webm"
```

- Voer het volgende commando uit:

```
npm test
```

## Software Guidebook

[Software Guidebook](https://github.com/HANICA-DWA/sep2021-project-koeskoes/tree/main/koeskoes/4.Sprint3/Documentatie/Software%20Guidebook)
