/**
 * Mail template for the mail when a video is watched
 * mail will be send to the buyer.
 *
 * @param {string} buyer
 * @param {string} receiver
 * @returns Mail preset
 */
const mailVideoWatched = (buyer, receiver) => {
  return `<html>
    <head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
      <style>
        p {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        a {
          color: #000000;
          text-decoration: none;
        }
        .row > p {
          margin-bottom: 0rem !important;
        }
      </style>
    </head>
  
    <body>
      <div class="container" style="background-color: #e8e8e8">
        <div class="row mb-3">
          <p>Beste ${buyer},</p>
        </div>
        <div class="row mb-4">
          <p>${receiver} heeft jouw Giftle ontvangen en bekeken!</p>
        </div>
        <div class="row">
          <p>
            Heel erg bedankt voor het bestellen van <b><i>een Giftle</i></b> en
            wie weet krijg jij er binnenkort wel eentje als cadeau!
          </p>
        </div>
        <div class="row mt-4">
          <p>Met vriendelijke groet,</p>
          <p>Giftle</p>
        </div>
      </div>
  
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
        integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
        crossorigin="anonymous"
      />
    </body>
  </html>`;
};

module.exports = mailVideoWatched;
