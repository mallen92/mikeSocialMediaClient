import UploadIcon from "@mui/icons-material/Upload";

export const UploadImageWindow = ({
  setImage,
  showThisWindow,
  openNextWindow,
}) => {
  const handleImageUpload = (e) => {
    const currentFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImage(fileReader.result);
      showThisWindow(false);
      openNextWindow(true);
    });

    fileReader.readAsDataURL(currentFile);
  };

  return (
    <div className="uploadImageWindow">
      <label className="imageUploadPrompt">
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleImageUpload}
        />

        <UploadIcon style={{ fontSize: "70px" }} />
        <div>Choose a file</div>
      </label>

      <div className="cancelUploadBtn" onClick={() => showThisWindow(false)}>
        Cancel
      </div>
    </div>
  );
};
