import loading from "./loading.gif";
import "./Loading.css";

export const Loading = () => {
  return (
    <>
      <img src={loading} className="loadingGif" alt="loading" />
      <div className="loadingNotice">Updating your profile pic...</div>
    </>
  );
};
