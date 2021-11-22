# Quality Attributes

## Prestatie (e.g. latency and throughput)

De performance qua latency en throughput moet goed zijn, wat inhoud dat er niet lang gewacht moet worden op data vanuit de database of de API. Tevens moet de website gebruiksvriendelijk zijn en makkelijk te navigeren zijn.

## Schaalbaarheid (e.g. data and traffic volumes)

Voor in development is de schaalbaarheid niet nodig. In de productie is schaalbaarheid waarschijnlijk wel nodig. Dit in verband met hoeveel de plug-in gebruikt wordt in een webshop en de hoeveelheid gebruikers die de plug-in gebruiken.

## Beschikbaarheid (e.g. uptime, downtime, scheduled maintenance, 24x7, 99.9%, etc)

- De plug-in moet 24/7 beschikbaar zijn (tenzij er onderhoud aan de plug-in is).
- Onderhoud moet minimaal 24 uur van te voren aangegeven worden aan de gebruikers.

## Beveiliging (e.g. authentication, authorisation, data confidentiality, etc)

- Maximale bestandgrootte wordt toegestaan, zodat de database niet vol raakt met hele grote video's.
- QR-codes scannen werkt alleen met codes die naar de plug-in leiden, zodat de gebruiker niet naar random websites wordt gelokt.
- Gegevens worden niet aan "third-party companies" verkocht.

## Uitbreidbaarheid

Uitbreidbaarheid is mogelijk. De gewenste aanpak is wel om scrum te gebruiken met een "project board" en eventuele "sprints" voor de "user stories" met de daarbijbehorende taken. Op deze manier is dus uitbreiding van het project mogelijk en zo is dit exact gedaan in het begin van het project.

## (Her)bruikbaarheid

- Door gebruik van componenten kunnen delen code opnieuw gebruikt worden zonder teveel herhaling.
- Door gebruik van functies kunnen delen code hergebruikt worden.
- Plug-in moet minimaal bij Apple apparaten in de safari browser gebruikt worden.
- Plug-in moet bij Android apparaten in de Chrome browser gebruikt kunnen worden.
- Plug-in moet bij Windows apparaten in de Chrome browser gebruikt kunnen worden.
- Gebruikers moeten op zowel smartphone als computer (met webcam en microfoon) de plug-in kunnen gebruiken.
- Bij IPhones moet de plug-in minimaal vanaf de IPhone 6 gebruikt kunnen worden.
- Knoppen op de front-end moeten een functie hebben en dus iets doen.

## Management en toezicht

- De mogelijkheid moet er zijn om het systeem op enkele stukken aan te passen, daarom worden er met meerdere 'react components' gewerkt.

## Betrouwbaarheid

De plug-in is afhankelijk van het volgende:

- Web Server
- Mail Server
- Database
- Internet verbinding
- Browser
- Camera
- Microfoon

## Wettelijke, nalevings- en regelgevende vereisten (e.g. data protection act)

- De gebruiker moet de algemene voorwaarden kunnen lezen en gaat op basis hiervan akkoord.
- De privacy wetgeving van Europa moet nagevolgd worden. Zie [autoriteitpersoonsgegevens](https://www.autoriteitpersoonsgegevens.nl/nl/over-privacy/wetten/internationale-privacywetgeving).
- Wettelijke vereisten voor langetermijnarchivering van bedrijfsgegevens. Zie [autoriteitpersoonsgegevens](https://www.autoriteitpersoonsgegevens.nl/nl/over-privacy/persoonsgegevens/bewaren-van-persoonsgegevens).
- Wettelijke vereisten voor log bestanden. Zie [logbestanden](https://cip-overheid.nl/media/1169/bid-operationale-producten-bir-015-logging-beleid-10.pdf).
- Wettelijke vereisten voor 'audit trials'. Zie [audit trails](https://www.graydon.nl/nl/resources/blog/strategie/wat-een-audit-trail).

## Internationalisering (i18n) en localisatie (L10n)

- Comments van code is in het Engels geschreven.
- Code is in het Engels geschreven.
- Front-end is in het Nederlands geschreven.
- Ondersteuning voor meerdere talen (voor front-end) is niet aanwezig.

## Toegankelijkheid

Toegankelijkheid is alleen beschikbaar voor het development team en de opdrachtgever.

<!--
Intent

This section is about summarising the key quality attributes and should answer the following types of questions:

* Is there a clear understanding of the quality attributes that the architecture must satisfy?
* Are the quality attributes SMART (specific, measurable, achievable, relevant and timely)?
* Have quality attributes that are usually taken for granted been explicitly marked as out of scope if they are not needed? (e.g. “user interface elements will only be presented in English” to indicate that multi-language support is not explicitly catered for)
* Are any of the quality attributes unrealistic? (e.g. true 24x7 availability is typically very costly to implement inside many organisations)

In addition, if any of the quality attributes are deemed as “architecturally significant” and therefore influence the architecture, why not make a note of them so that you can refer back to them later in the document.
-->
