const mailOrderPlaced = (buyer) => {
  return `<html>
    <head>
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" 
        crossorigin="anonymous"
      />
      <style>
        p{
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        a{
          color: #000000;
          text-decoration: none;
        }
        .row > p{
          margin-bottom: 0rem !important;
        }
        .btn{
          padding: 0.575rem 2rem !important;
          border-radius: 0.75rem !important;
        }
      </style>
    </head>
    <body>
      <div class="container" style="background-color: #e8e8e8;">
        <div class="row mb-3">
          <p>Beste ${buyer},</p>
        </div>
        <div class="row mb-3">
          <p>Wat leuk dat je een Giftle hebt besteld!</p>
        </div>
        <div class="row mb-3">
          <p>Als je hieronder op de knop drukt, wordt je doorgeleid naar onze pagina.
          Hier kun je je video uploaden of opnemen. Vervolgens kan je de naam en het e-mail van de ontvanger doorgeven!</p>
        </div>
        <a href="http://localhost:3000/buyer" class="btn btn-secondary mt-4 mb-4">Ga naar Giftle!</a>
        <div class="row">
          <p>Werkt de knop niet? Dan kunt u onze pagina ook vinden door op deze link te klikken:</p>
          <a href="http://localhost:3000/buyer">http://localhost:3000/buyer</a>
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

module.exports = mailOrderPlaced;
