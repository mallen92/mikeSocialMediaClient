import { unsetUser } from "../state/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ErrorBanner = ({ error, closeBanner }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="errorBanner">
      {error.includes("Server error") ? (
        <div className="errorBannerMsg" onClick={() => closeBanner("")}>
          {error}
        </div>
      ) : (
        <div className="errorBannerMsg" onClick={logOutUser}>
          {error}
        </div>
      )}
    </div>
  );
};
