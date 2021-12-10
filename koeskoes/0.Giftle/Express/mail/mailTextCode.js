/**
 * Mail template for the receiver when an order is placed
 * containing the textcode
 *
 * @param {string} receiver
 * @param {string} buyer
 * @param {string} textCode
 * @returns Mail preset
 */
const mailTextCode = (receiver, buyer, textCode) => {
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
      span{
          border: 2px dotted black;
          padding: 0.5rem;
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
      .mb{
          margin-bottom: 3rem;
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
        <p>Beste ${receiver},</p>
      </div>
      <div class="row">
        <p>${buyer} heeft u een Giftle gestuurd!</p>
      </div>
      <div class="row mb">
          <p>Om deze Giftle te kunnen openen, klikt u op de knop hieronder. Hiervoor heeft u een speciale tekstcode nodig.</p>
          <p>Uw tekstcode is: <span><b><i>${textCode}</i></b></span></p>
      </div>
      <div class="row">
          <a href="http://localhost:3000/watchvideo/${textCode}" class="btn">Bekijk de Giftle!</a>
      </div>
      <div class="row note">
          <p>Werkt de knop niet? Dan kunt u onze pagina ook vinden door op deze link te klikken:</p>
          <a href="http://localhost:3000/watchvideo/${textCode}" class="link">https://www.giftle.nl/watchvideo/${textCode}</a>
      </div>
      <div>
        <p>Met vriendelijke groet,</p>
        <p>Giftle</p>
      </div>
    </div>
  </body>
</html>`;
};

module.exports = mailTextCode;
