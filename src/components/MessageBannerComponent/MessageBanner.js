import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unsetUser } from "../../state/userSlice";
import "./MessageBanner.css";

export const MessageBanner = ({
  success,
  closeSuccess,
  warning,
  closeWarning,
  error,
  closeError,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="messageBanner">
      {success ? (
        <div className="bannerMessage successMessage">
          {success}

          <div className="closeBanner" onClick={() => closeSuccess("")}>
            &#10006;
          </div>
        </div>
      ) : (
        <></>
      )}
      {warning ? (
        <div className="bannerMessage warningMessage">
          {warning}

          <div className="closeBanner" onClick={() => closeWarning("")}>
            &#10006;
          </div>
        </div>
      ) : (
        <></>
      )}
      {error ? (
        <div className="bannerMessage errorMessage">
          {error.includes("Access denied") || error.includes("session") ? (
            <>
              {error}

              <div className="closeBanner" onClick={logOutUser}>
                &#10006;
              </div>
            </>
          ) : (
            <>
              {error}

              <div className="closeBanner" onClick={() => closeError("")}>
                &#10006;
              </div>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
