const Spinner = () => {
  return (
    <>
      <div className="spinner-border my-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div classname="loading-text" role="status">
        <h5>Een moment geduld a.u.b.</h5>
      </div>
    </>
  );
};

export default Spinner;
