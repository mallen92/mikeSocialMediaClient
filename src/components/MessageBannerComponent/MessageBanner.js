import CloseIcon from "@mui/icons-material/Close";
import "./MessageBanner.css";

export const MessageBanner = ({
  success,
  showSuccess,
  warning,
  showWarning,
  error,
  showError,
}) => {
  return (
    <div className="messageBanner">
      {success ? (
        <div className="bannerMessage successMessage">
          {success}

          <div className="closeBanner" onClick={() => showSuccess("")}>
            &#10006;
          </div>
        </div>
      ) : (
        <></>
      )}
      {warning ? (
        <div className="bannerMessage warningMessage">
          {warning}

          <div className="closeBanner" onClick={() => showWarning("")}>
            &#10006;
          </div>
        </div>
      ) : (
        <></>
      )}
      {error ? (
        <div className="bannerMessage errorMessage">
          {error}

          <div className="closeBanner" onClick={() => showError("")}>
            &#10006;
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
