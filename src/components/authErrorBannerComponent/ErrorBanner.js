import { unsetUser } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./ErrorBanner.css";

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
        <>
          <div className="errorMsg">{error}</div>
          <CloseIcon
            fontSize="large"
            className="closeErrorBanner"
            onClick={logOutUser}
          />
        </>
      ) : (
        <>
          <div className="errorMsg">{error}</div>
          <CloseIcon
            fontSize="large"
            className="closeErrorBanner"
            onClick={() => closeBanner("")}
          />
        </>
      )}
    </div>
  );
};
