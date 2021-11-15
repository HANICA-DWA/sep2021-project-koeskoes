import React from "react";
import { Navigate } from 'react-router-dom'

function HomeReceiver() {
  const [toQRcode, setToQRcode] = React.useState(false);
  const [toTextcode, setToTextcode] = React.useState(false);

  if (toQRcode === true) {
    return <Navigate to='/QRcode'/>
  }

  if (toTextcode === true) {
    return <Navigate to='/Textcode'/>
  }

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1>Welkom op Giftle!</h1>
        <p>
          Wat leuk dat je een Giftle hebt ontvangen! Je kunt hem bekijken door
          de QR-code te scannen of door de tekstcode in te vullen.
          <br />
          <br />
          Ik heb een...
        </p>
        <button className="btn btn-primary mx-2">QR-code</button>
        <button className="btn btn-primary mx-2">Tekstcode</button>
      </div>
    </div>
  );
}

export default HomeReceiver;
