import "./AuthUserErrorWindow.css";

export const AuthUserErrorWindow = (props) => {
  return (
    <div className="errorWindow">
      <div className="errorWindowTitle">ERROR</div>
      <div className="errorWindowMsg">{props.error}</div>
    </div>
  );
};
