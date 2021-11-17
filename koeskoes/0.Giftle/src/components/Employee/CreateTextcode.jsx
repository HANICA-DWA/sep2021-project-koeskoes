import React from "react";
import { useState } from "react";

function CreateTextcode() {
  const [randomCode, setRandomCode] = useState(null);

  const createRandomCode = () => (Math.random() + 1).toString(36).substr(2, 6);

  return (
    <div>
      <button
        className="btn btn-primary my-5"
        onClick={() => setRandomCode(createRandomCode())}
      >
        Genereer code
      </button>

      <p>{randomCode}</p>
    </div>
  );
}

export default CreateTextcode;
