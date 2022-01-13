# Data

## Algemene informatie

De data wordt opgeslagen in MongoDB onder de databasenaam 'Giftle' en heeft op het moment maar één collectie, genaamd 'uploadschemas'.

## Database schema

[Wat is een Schema?](https://docs.mongodb.com/realm/schemas/)

    const uploadSchema = new mongoose.Schema({
      emailGifter: {
        type: String,
        required: true,
        validate: [
          validator.isEmail,
          "Het e-mailadres is niet in het juiste formaat. 
           Gebruik een @ met een domein (b.v. @hotmail.com)",
        ],
      },
      firstNameGifter: {
        type: String,
        required: true,
        max: 300,
      },
      lastNameGifter: {
        type: String,
        required: true,
        max: 300,
      },
      emailReceiver: {
        type: String,
        validate: [
         validator.isEmail,
         "Het e-mailadres is niet in het juiste formaat. 
         Gebruik een @ met een domein (b.v. @hotmail.com)",
        ],
      },
      firstNameReceiver: {
        type: String,
        required: true,
        max: 300,
      },
      lastNameReceiver: {
        type: String,
        required: true,
        max: 300,
      },
      videoName: {
        type: String,
        default: undefined,
        sparse: true,
      },
      videoDuration: {
        type: String,
        default: 0,
        sparse: true,
      },
      textCode: {
        type: String,
        unique: true,
        min: 6,
        max: 6,
      },
      prePrinted: {
        type: Boolean,
        required: true,
        default: false,
      },
      printed: {
        type: Boolean,
        required: true,
        default: false,
      },
      textcodeSent: {
        type: Boolean,
        required: true,
        default: false,
      },
      answerVideo: {
        type: String,
      },
      answerVideoDuration: {
        type: String,
      },
      answerText: {
        type: String,
        default: "",
        max: 280,
      },
      answerSent: {
        type: Boolean,
        required: true,
        default: false,
      },
    });

## Data opslaan
Hieronder staat vermeld hoe bepaalde data die wij hebben opgeslagen wordt.

### Opslaan video's
Wij slaan de videobestanden op in de ```Express``` map onder de map ```videos```. Dit is de meest gebruikelijke manier voor het opslaan van de video's.

### Ingebouwde validatie met Mongoose
Op het moment valideren wij alleen de e-mailadressen met Mongoose. Uiteraard is het goed om te zorgen voor extra beveiliging dat Mongoose alle velden controleert wanneer dit nodig is.

<!--
Intent

The purpose of the data section is to record anything that is important from a data perspective, answering the following types of questions:

• What does the data model look like?
• Where is data stored?
• Who owns the data?
• How much storage space is needed for the data? (e.g. especially if you’re dealing with “big data”)
• What are the archiving and back-up strategies?
• Are there any regulatory requirements for the long term archival of business data?
• Likewise for log files and audit trails?
• Are flat files being used for storage? If so, what format is being used?
-->
