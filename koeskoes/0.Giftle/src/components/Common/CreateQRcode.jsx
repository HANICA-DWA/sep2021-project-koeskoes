import QRCodeStyling from "qr-code-styling";
import logo from '../../assets/favicon.png';

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
    image: logo,
    dotsOptions: {
      color: "#000000",
      type: "rounded",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 10,
    },
    data,
  });
};

export default qrcode;
