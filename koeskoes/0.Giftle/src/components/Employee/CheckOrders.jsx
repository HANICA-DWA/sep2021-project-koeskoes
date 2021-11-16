import React from "react";

function CheckOrders() {
  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ordernummer</th>
              <th scope="col">Naam koper</th>
              <th scope="col">E-mail koper</th>
              <th scope="col">Naam ontvanger</th>
              <th scope="col">E-mail ontvanger</th>
              <th scope="col">QR-code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CheckOrders;
