import loading from "./loading.gif";
import "./LoadingWindow.css";

export const LoadingWindow = () => {
  return (
    <>
      <img src={loading} className="loadingGif" alt="loading" />
      <div className="loadingNotice">Updating your profile pic...</div>
    </>
  );
};
