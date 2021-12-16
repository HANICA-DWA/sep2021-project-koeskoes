/**
 * Mail template for the buyer when the receiver sent a text reaction
 *
 * @param {string} buyer
 * @param {string} receiver
 * @param {string} textReaction
 * @returns Mail preset
 */
const mailTextReaction = (buyer, receiver, textReaction) => {
  return `<html>
    <head>
      <style>
        body {
          margin: 0rem;
        }
        p {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        .container {
          background-color: #e8e8e8;
          padding: 1rem 5rem 1rem 5rem;
        }
        .row {
          margin-bottom: 2rem;
        }
        .row > p {
          margin-bottom: 0rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="row">
          <p>Beste ${buyer},</p>
        </div>
        <div class="row">
          <p>
            ${receiver} heeft gereageerd op de Giftle die je hebt gestuurd!
            <br><br>
            Lees hieronder de tekstreactie die ${receiver} heeft gegeven:
            <br><br>
            <i>${textReaction}</i>
          </p>
        </div>
        <div>
          <p>Met vriendelijke groet,</p>
          <p>Giftle</p>
        </div>
      </div>
    </body>
  </html>`;
};

module.exports = mailTextReaction;
