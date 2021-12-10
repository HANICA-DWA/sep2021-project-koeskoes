/**
 * Mail template for the mail when a buyer
 * forgets to upload a video (a remindermail)
 *
 * @param {string} buyer
 * @param {string} textCode
 * @returns Mail preset
 */
const mailUploadReminder = (buyer, textCode) => {
  return `<html>
  <head>
    <style>
      body{
          margin: 0rem;
      }
      p{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
      a{
        color: #000000;
        text-decoration: none;
      }
      .container{
          background-color: #e8e8e8;
          margin-left: 18.75rem;
          margin-right: 18.75rem;
          padding-left: 5rem;
          padding-right: 5rem;
      }
      .row{
          margin-bottom: 2rem;
      }
          .row > p{
            margin-bottom: 0rem;
          }
      .btn{
          background-color: #0d6efd;
          border-radius: 0.25rem;
          color: #ffffff;
          margin-bottom: 2rem;
          padding: 0.575rem 1.5rem;
      }
        .btn:hover{
          opacity: 0.8;
        }
      .note > p, .note > a{
          font-size: 12px;
      }
      .link{
        color: #1c0dfd;
        font-style: italic;
      }
        .link:hover{
          text-decoration: underline;
        }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <p>Beste ${buyer},</p>
      </div>
      <div class="row">
        <p>Klopt het dat je nog geen filmpje hebt opgenomen?</p>
      </div>
      <div class="row">
        <p>Jouw cadeau kan niet verstuurd worden, voordat er een video is geüpload!</p>
      </div>
      <div class="row">
          <p>Je kan via de knop hieronder jouw video <b><i>uploaden</i></b> of <b><i>opnemen</i></b>, daarna kan je de naam en het e-mailadres van de ontvanger doorgeven.</p>
        </div>
      <div class="row">
          <a href="http://localhost:3000/orderControl/${textCode}" class="btn">Ga naar Giftle!</a>
      </div>
      <div class="row note">
        <p>Werkt de knop niet? Dan kunt u onze pagina ook vinden door op deze link te klikken:</p>
        <a href="http://localhost:3000/orderControl/${textCode}" class="link">https://www.giftle.nl/ordercontrol/${textCode}</a>
      </div>
      <div>
        <p>Met vriendelijke groet,</p>
        <p>Giftle</p>
      </div>
    </div>
  </body>
</html>`;
};

module.exports = mailUploadReminder;
