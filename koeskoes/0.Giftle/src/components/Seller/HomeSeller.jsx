import React from "react";
function HomeSeller() {
  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1>Welkom op Giftle!</h1>
        <p className="mt-3 mb-5">
          Wilt u een video meesturen met uw cadeau? Als u een video heeft, kunt
          u deze uploaden. Er kan ook een video worden opgenomen.
        </p>
        <button className="btn btn-primary mx-4">Opnemen</button>
        <button className="btn btn-primary mx-4">Uploaden</button>
      </div>
    </div>
  );
}

export default HomeSeller;
