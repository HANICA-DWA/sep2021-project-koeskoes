# Quality Attributes

<!--
Intent

This section is about summarising the key quality attributes and should answer the following types of questions:

* Is there a clear understanding of the quality attributes that the architecture must satisfy?
* Are the quality attributes SMART (specific, measurable, achievable, relevant and timely)?
* Have quality attributes that are usually taken for granted been explicitly marked as out of scope if they are not needed? (e.g. “user interface elements will only be presented in English” to indicate that multi-language support is not explicitly catered for)
* Are any of the quality attributes unrealistic? (e.g. true 24x7 availability is typically very costly to implement inside many organisations)

In addition, if any of the quality attributes are deemed as “architecturally significant” and therefore influence the architecture, why not make a note of them so that you can refer back to them later in the document.
-->


## Performance (e.g. latency and throughput)

## Scalability (e.g. data and traffic volumes)
Welke?
Vertical: To increase, we add more resources, such as memory, disks, or processors into one system.
Horizontal: We increase the number of computing units and divide the load.\
?\
?\
?\
?\
?
## Availability (e.g. uptime, downtime, scheduled maintenance, 24x7, 99.9%, etc)
* De plug-in moet 24/7 beschikbaar zijn (tenzij er onderhoud aan de plugin is)
* Onderhoud moet minimaal 24 uur van te voren aangegeven worden aan de gebruikers
## Security (e.g. authentication, authorisation, data confidentiality, etc)
* Maximale bestandgrootte wordt toegestaan, zodat de database niet vol raakt met video's
* QR-codes scannen werkt alleen met codes die naar de plug-in leiden, zodat de gebruiker niet naar random websites wordt gelokt
*  
## Extensibility
## Reusability
* Door gebruik van componenten kunnen delen code opnieuw gebruikt worden zonder teveel herhaling
* Door gebruik van functies kunnen delen code hergebruikt worden
## Auditing
## Monitoring and management
* De mogelijkheid moet er zijn om het systeem op enkele stukken aan te passen, daarom wordt er met meerdere React componenten gewerkt. 
* 
## Reliability
De plug-in is afhankelijk van het volgende:
* Web Server
* Mail Server
* Database
* Internet verbinding
* Browser
* Camera
* Microfoon
## Failover/disaster recovery targets (e.g. manual vs automatic, how long will this take?)
## Business continuity
## Interoperability
## Legal, compliance and regulatory requirements (e.g. data protection act)
* De gebruiker moet de Algemene voorwaarden kunnen lezen.
* Er moet duidelijk aangegeven worden, dat er bij gebruik van de plug
## Internationalisation (i18n) and localisation (L10n)
* Software code is in het Engels
* Front-end is in het Nederlands
* Ondersteuning voor meerdere talen (voor front-end) is niet aanwezig
## Accessibility
## Usability
* Gebruikers moeten op zowel smartphone als computer (met webcam) de plug-in kunnen gebruiken
* Plug-in moet minimaal bij Apple apparaten in de safari browser gebruikt worden
* Plug-in moet bij Android apparaten in de Chrome browser gebruikt kunnen worden
* Plug-in moet bij Windows apparaten in de Chrome browser gebruikt kunnen worden
* Bij IPhones moet de plug-in minimaal vanaf de IPhone 6 gebruikt kunnen worden
* Knoppen op de front end moeten een functie hebben en niet niks doen
*   

List of supported devices, OS versions, screen resolutions, and browsers and their versions.
Elements that accelerate user interaction, such as “hotkeys,” “lists of suggestions,” and so on.
The average time a user needs to perform individual actions.
Support of accessibility for people with disabilities.


