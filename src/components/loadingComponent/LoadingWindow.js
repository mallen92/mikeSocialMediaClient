import loading from "./loading.gif";
import "./LoadingWindow.css";

export const LoadingWindow = () => {
  return (
    <div className="loadingWindow">
      <div className="loadingGifContainer">
        <img src={loading} className="loadingGif" alt="loading" />
        <div className="loadingNotice">Updating your profile pic...</div>
      </div>
    </div>
  );
};
