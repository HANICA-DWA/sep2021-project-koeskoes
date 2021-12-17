const TimeComponent = (props) => {
  const minutes = Math.floor(props.time / 60);
  const seconds = Math.floor(props.time) - minutes * 60;

  return (
    <div>
      {(minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds === 60 ? "00" : seconds)}
    </div>
  );
};

export default TimeComponent;
