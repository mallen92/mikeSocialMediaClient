import loading from "./loading.gif";
import "./LoadingWindow.css";

export const LoadingWindow = () => {
  return (
    <div className="loadingWindow">
      <img src={loading} className="loadingGif" alt="loading" />
      <div className="loadingNotice">Updating your profile pic...</div>
    </div>
  );
};
