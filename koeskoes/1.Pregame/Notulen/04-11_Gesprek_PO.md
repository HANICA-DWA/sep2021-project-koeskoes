# Gesprek Product Owner
## DROP
### Doelen:
* Product backlog opstellen
* Priotering in backlog

### Rollen:
#### Notulen:
* Sven
* Ilse

### Onderwerpen
### Vragen
* In de documentatie staat "De oplossing moet eenvoudig aan gangbare types webshop gekoppeld kunnen worden". Wat wordt er precies met gangbare types bedoeld?
* QR Products wil een ‘plug and play’ oplossing ontwikkelen voor webshops en retailers. Wat wordt er precies met "plug and play" bedoeld?
* Hoe ziet de product owner het uploaden voor zich?
  * Uploaden met QR-code of URL. Wat is hier de voorkeur?
* Wat wordt er bedoeld met een luchtige en betrouwbare uitstraling?
* Wat is de back-end omgeving waarin de filmpjes veilig en betrouwbaar gehost kunnen worden en de instellingen zoals de duur aangepast kunnen worden?
* Openen video op 2 manieren en welke heeft hogere prioritering?
  * QR-code
  * Of met code, moet deze code cijfers en/of letters bevatten en welke ontangmethode(bijvoorbeeld bestelnummer of het mobiele telefoonnummer v/d ontvanger)?  
* Moet de gebruiker de videoboodschap alleen kunnen uploaden of ook in de website opnemen?
* Moet de mogelijkheid er zijn om de video terug te kijken voor opsturen?
* Welke videoformats moet de site ondersteunen(mp4, mov, mkv)?
* De reactie kan een video of een tekstbericht zijn, is hier een voorkeur voor?
  * Moet het eerste bericht ook een tekstbericht kunnen zijn?
* Krijgen wij een mailprovider aangereikt voor het versturen van de verschillende mails.
* Moeten wij een eigen styling maken voor de mails?
* Wat moet de huisstijl zijn? (Styling van Magento of een eigen huisstijl)     
* Moet de web applicatie responsive zijn?
  * Zoja, mobile of desktop first?
* Het idee is dat een schenker in maximaal 3 stappen een video kan uploaden. Hoe worden deze stappen gezien (Video uploaden, info invullen en verzenden)?
* Wat zijn de twee stappen voor de ontvanger?
* De ontvanger moet een video kunnen delen op social media, moet dit een link naar het filmpje worden (code al ingevuld)?


## Procedures
### Waar?
Op school
### Lengte?
3x 30 min
### Hulpmidddelen?
Laptop
### Hoe?
Mogelijk in een ronding, anders hoe de opstelling al staat
### Hoe zitten?
Iedereen moet de product owner aan kunnen kijken (actieve houding)

## Notulen
Begrip van opdracht is goed, maar goed opletten op de back-end die gemaakt moet worden, deze is het belangrijkste. Webshop owner moet alle statistieken daarin makkelijk kunnen zien.

### Vragen
#### Algemene vragen
<ul>
  <li>QR-code hoeft niet per se gebruikt te worden bij het bekijken van een video, er mag ook een alternatief gebruikt worden.</li>
  <li>Zoveel mogelijk responsiveness inbouwen, belangrijk!</li>
  <li>Design is op dit moment niet heel belangrijk, vormgeving moet wel makkelijk aan te passen zijn.</li>
  <li>In principe zoveel mogelijk videoformats, in ieder geval de meest gebruikte. Onderzoeken tijdens de sprints, misschien is er een library die hiermee kan helpen.</li>
</ul>

#### Verzender vragen
<ul>
  <li>De manier van uploaden staat niet helemaal vast en is open voor interpretatie, staat grotendeels wel beschreven in de opdracht.</li>
  <li>Maximaal aantal stappen gaat niet per se om het getal, maar er moet gewoon voor gezorgd worden dat het zo makkelijk en laagdrempelig mogelijk is.</li>
  <li>Video moet zowel opgenomen kunnen worden in de plugin zelf en worden geupload.</li>
</ul>

#### Ontvanger vragen
<ul>
  <li>De manier van ontvangen is open voor eigen interpretatie, we mogen zelf bedenken hoe de video aankomt bij de ontvanger. Dit kan met een QR-code, maar ook anders.</li>
  <li>De twee stappen voor de ontvanger zijn het scannen van bijvoorbeeld de QR-code en het daadwerkelijk aanklikken van de video. Dit is zoals eerder gezegd flexibel en hier mogen we ook ons eigen idee bij uitwerken.</li>
</ul>

#### Mail vragen
<ul>
  <li>Er is een webserver beschikbaar die we kunnen inrichten zoals wij willen.</li>
</ul>

### Backlog / Algemeen
<ul>
  <li>In de prioritering van de backlog zijn we ook vrij, maar de back-end/serverbeheer is sowieso belangrijk.</li>
  <li>Tip van Robert om naar te kijken voor het scannen van QR-codes: Cordova.</li>
  <li>Backlog hoeft niet echt opgedeeld te worden in prioriteiten, dit heeft niet zoveel waarde in SCRUM.</li>
  <li>Wijs in het PvA alvast de user stories aan die in sprint 1 gedaan zouden kunnen worden, samen met de acceptatiecriteria hierbij. Meestal zijn dit de user stories die:
    <ul>
      <li>de infrastructuur opbouwen;</li>
      <li>de belangrijke technische risico's adresseren (dingen waarover we onzeker zijn en die veel tijd zouden gaan kunnen kosten, zoals mails versturen).</li>
    </ul>
  </li>
  <li>Integrering met webshop kan tricky worden: komende week al onderzoek naar doen (Magento, Shopify & WooCommerce). Als de integratie echt te lastig is, dan gaan we dit faken.</li>
</ul>

