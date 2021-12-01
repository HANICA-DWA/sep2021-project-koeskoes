/**
 * ErrorMessage function to describe the message and runs a callback function.
 *
 * @param {String} message Text to describe the message
 * @param cb Callback to run a function
 * @return ErrorMessage with text and a callback function
 *
 */
const ErrorMessage = (message, cb) => {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <div>{message}</div>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={() => cb()}
      ></button>
    </div>
  );
};

export default ErrorMessage;
