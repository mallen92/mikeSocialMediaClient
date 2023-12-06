import Loading from "../../images/Loading.gif";
import "../styles/LoadingWindow.css";

export const LoadingWindow = () => {
  return (
    <div className="loadingWindow">
      <img src={Loading} className="loadingGif" alt="loading" />
      <div className="loadingNotice">Updating your pic...</div>
    </div>
  );
};
