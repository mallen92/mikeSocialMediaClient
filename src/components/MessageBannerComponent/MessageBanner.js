import "./MessageBanner.css";

export const MessageBanner = ({
  success,
  closeSuccess,
  warning,
  closeWarning,
  error,
  closeError,
}) => {
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
          {error}

          <div className="closeBanner" onClick={() => closeError("")}>
            &#10006;
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
