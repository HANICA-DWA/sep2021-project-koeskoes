import QRCodeStyling from "qr-code-styling";

/**
 * ErrorMessage function to describe the message and runs a callback function.
 *
 * @param {String} data Callback to run a function
 * @return QR-code with the correct URL and styling
 *
 */
const qrcode = (data) => {
  return new QRCodeStyling({
    width: 300,
    height: 300,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    dotsOptions: {
      color: "#4267b2",
      type: "rounded",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20,
    },
    data,
  });
};

export default qrcode;
