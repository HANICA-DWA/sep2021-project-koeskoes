# [sep2021-project-koeskoes](https://en.wikipedia.org/wiki/Spilocuscus)

<img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Cuscus1.jpg" alt="koeskoes" width="200"/>

## Opdracht

[Giftle](https://github.com/HANICA-DWA/sep2021-project-koeskoes/blob/main/koeskoes/4.Sprint3/Documentatie/Software%20Guidebook/01_context.md)

## Betrokkenen

| Naam               |         | Rol           |
|--------------------|---------|---------------|
| Robert Holwerda    | Docent  | Product Owner |
| Lars Tijsma        | Docent  | Coach         |
| Helen Visser       | Docent  | Skills        |
| Sjoerd de Bruin    | Student |               |
| Sven van Ee        | Student |               |
| Ilse van de Peppel | Student |               |
| Jordi Obermeier    | Student |               |

## Installatie
Om goed voorbereid te zijn op deze installatie en om de installatie helemaal goed te krijgen, vragen wij je om de volgende installaties alvast te hebben en te checken:
- [GitHub desktop](https://desktop.github.com/)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Robo3T](https://robomongo.org/)
- [BELANGRIJK - FFmpeg hoe te installeren](https://www.wikihow.com/Install-FFmpeg-on-Windows) | [FFmpeg downloads](https://www.ffmpeg.org/download.html) | [versie van Windows die wij gebruiken voor dit project](https://www.gyan.dev/ffmpeg/builds/packages/ffmpeg-4.3.2-full_build.7z)

### Het project installeren lokaal | 6 stappen
Nu bovengenoemde software geïnstalleerd is, kunnen wij verder met het installeren van het project Giftle. Om het project Giftle online te zetten klik je op de volgende link: [Giftle online zetten](https://github.com/HANICA-DWA/sep2021-project-koeskoes/blob/main/koeskoes/4.Sprint3/Documentatie/Software%20Guidebook/11_deployment.md).
1. Klik op de groene knop **Code**. Maak een keuze door om de bestanden te downloaden *(volg 2)* of om het te openen in GitHub desktop *(volg 3)*.
2. Als de bestanden zijn gedownload, dan pak je het bestand uit en vervolgens plaats je deze in de door jou aangegeven (algemene) GitHub mapje (*standaard locatie: C:\Users\{jouw naam}\Documents\GitHub*). Ga nu meteen door naar stap 4.
3. Als de melding op komt, klik je op **GitHubDesktop openen** en volg je de stappen die daar staan om het project Giftle lokaal te krijgen.
4. Nu staat het project lokaal. Open (twee keer!) command prompt of windows powershell. Navigeer een keer naar de **0.Giftle** map in een command prompt of powershell. Navigeer ook een keer naar de **Express** map in een andere command prompt of powershell.\
Dus twee command prompts of powershells met: \
**0.Giftle** -> sep2021-project-koeskoes\koeskoes\0.Giftle            (*standaard locatie: C:\Users\{jouw naam}\Documents\GitHub\sep2021-project-koeskoes\koeskoes\0.Giftle*) \
**Express**  -> sep2021-project-koeskoes\koeskoes\0.Giftle\Express    (*standaard locatie: C:\Users\{jouw naam}\Documents\GitHubsep2021-project-koeskoes\koeskoes\0.Giftle\Express*) \
5. Eerst gaan wij naar de Express map en dus ook met de command prompt of windows powershell. Dit is de server die benodigd is om alle connecties met de database te doen, daarom installeren en starten wij deze als eerst. \
*Installeren*:  npm i (dit voert alle afhankelijkheden uit die dit project nodig heeft) \
*Starten*:      node app.js (dit start de server) \
Nu staat er in de command prompt of windows powershell: Server started on port 4000. De server staat op dit moment aan.
6. Nu gaan wij naar de 0.Giftle map en dus ook met de command prompt of windows powershell. Dit is de gehele website dat front- en backend bij elkaar samenbrengt. Ook hier installeren en starten wij 0.Giftle via de command prompt. \
*Installeren*:  npm i (dit voert alle afhankelijkheden uit die dit project nodig heeft) \
*Starten*:      npm start (dit start de development server)
Nu staan er wat gegevens in voor de connectie, maar dit wordt ook al automatisch gedaan bij het opstarten.

Nu is Giftle lokaal geïnstalleerd.
