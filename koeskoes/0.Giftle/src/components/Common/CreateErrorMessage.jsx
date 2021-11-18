const ErrorMessage = (message, cb) => {
  return <div class="alert alert-danger d-flex align-items-center" role="alert">
    <div>{message}</div>
    <button
      type="button"
      className="btn-close float-end"
      data-bs-dismiss="alert"
      aria-label="Close"
      onClick={() => cb()}
    ></button>
  </div>
}

export default ErrorMessage;