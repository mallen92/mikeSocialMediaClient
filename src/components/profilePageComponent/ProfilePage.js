import { useState, useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import { Loading } from "../loadingComponent/Loading";
import { updateProfilePic } from "../../state/userSlice";
import { unsetUser } from "../../state/userSlice";
import getCroppedImg from "../../util/getCroppedImage";
import { URL } from "../../util/url";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const user = useSelector((state) => state.userSlice.user);
  const newRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
  const navigate = useNavigate();
  
  const [showProfilePicOptions, setShowProfilePicOptions] = useState(false);
  const [showUploadImageWindow, setShowUploadImageWindow] = useState(false);
  const [image, setImage] = useState(null);
  const [showCropAndSavePicWindow, setShowCropAndSavePicWindow] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showLoadingWindow, setShowLoadingWindow] = useState(false);
  const dispatch = useDispatch();
  const [showDeleteConfWindow, setShowDeleteConfWindow] = useState(false);
  const [error, setError] = useState(null);

  const toggleProfilePicOptions = () => {
    if (showProfilePicOptions) setShowProfilePicOptions(false);
    else setShowProfilePicOptions(true);
  };

  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setShowProfilePicOptions(false);
    }
  };

  const handleImageUpload = (e) => {
    const currentFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImage(fileReader.result);
      setShowUploadImageWindow(false);
      setShowCropAndSavePicWindow(true);
    });

    fileReader.readAsDataURL(currentFile);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const changeProfilePic = async () => {
    try {
      setShowCropAndSavePicWindow(false);
      setShowLoadingWindow(true);

      const uncompressedProfilePic = await getCroppedImg(
        image,
        croppedAreaPixels
      );
      const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 1000,
      };
      const newProfilePic = await imageCompression(
        uncompressedProfilePic,
        options
      );

      const formData = new FormData();
      formData.append("image", newProfilePic);
      const response = await axios.post(`${URL}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.user_token}`,
        },
      });

      saveNewProfilePic(response.data);
      setShowLoadingWindow(false);
    } catch (error) {
      setError(error.response.data.message);
      setShowLoadingWindow(false);
    }
  };

  const deleteProfilePic = async () => {
    try {
      setShowDeleteConfWindow(false);
      setShowLoadingWindow(true);

      const response = await axios.delete(`${URL}/images`, {
        headers: {
          Authorization: `Bearer ${user.user_token}`,
        }
      });

      saveNewProfilePic(response.data);
      setShowLoadingWindow(false);
    } catch (error) {
      setError(error.response.data.message);
      setShowLoadingWindow(false);
    }
  };

  const saveNewProfilePic = (image) => {
    dispatch(updateProfilePic(image));
    let localUser = JSON.parse(window.localStorage.getItem("user"));
    localUser.user_profile_pic = image;
    window.localStorage.setItem("user", JSON.stringify(localUser));
  };

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="profilePage_Content">
      <div className="profilePage_UserInfo">
        <div className="profilePage_ProfilePicAndPicOptions" ref={newRef}>
          <img src={user.user_profile_pic} className="profilePage_UserProfilePic" alt="profile_picture" onClick={toggleProfilePicOptions} />

          {showProfilePicOptions ? (
            <div className="profilePicOptions" onClick={() => setShowProfilePicOptions(false)}>
              <div className="picOption" onClick={() => setShowUploadImageWindow(true)} >
                <SyncIcon />
                <div>Change Profile Picture</div>
              </div>

              <div className="picOption deletePicOption" onClick={() => setShowDeleteConfWindow(true) }>
                <DeleteIcon />
                <div>Delete Profile Picture</div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="profilePage_UserName">{`${user.user_first_name} ${user.user_last_name}`}</div>
      </div>

      { error ? (
        <div className="errorWindow">
          <div className="errorWindowTitle">ERROR</div>
          <div className="errorWindowMsg">{error}</div>

          { error.includes("session") ? (
            <div className="errorWindowCloseBtn" onClick={logOutUser}>OK</div> 
          ) : (
            <div className="errorWindowCloseBtn" onClick={() => setError(null)}>OK</div>
          )}

        </div>
      ) : (
        <></>
      )}

      {showUploadImageWindow ? (
        <div className="uploadImageWindow">
          <label className="imageUploadPrompt">
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload} />

            <UploadIcon style={{ fontSize: "70px" }} />
            <div>Choose a file</div>
          </label>

          <div className="cancelUploadBtn" onClick={() => setShowUploadImageWindow(false)} >
            Cancel
          </div>
        </div>
      ) : ( 
        <></>
      )}

      {showCropAndSavePicWindow ? (
        <div className="cropAndSavePicWindow">
          <div className="cropperContainer">
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="cropandSavePicWindowBtns">
              <div className="cropandSavePicWindowBtn saveCropBtn" onClick={changeProfilePic}>
                Save
              </div>
              <div className="cropandSavePicWindowBtn cancelCropBtn" onClick={() => setShowCropAndSavePicWindow(false)}>
                Cancel
              </div>
            </div>
          </div>
        </div>
      ) : ( 
        <></>
      )}

      {showLoadingWindow ? (
        <div className="loadingWindow">
          <div className="loadingGifContainer">
            <Loading />
          </div>
        </div>
      ) : (
        <></>
      )}

      {showDeleteConfWindow ? (
        <div className="deleteConfWindow">
          <div className="deleteConfMsg">
          Are you sure you want to delete your profile picture?
          </div>
          <div className="deleteConfWindowBtns">
              <div className="deleteConfWindowBtn confirmDeleteBtn" onClick={deleteProfilePic}>
                Yes
              </div>
              <div className="deleteConfWindowBtn cancelDeleteBtn" onClick={() => setShowDeleteConfWindow(false)}>
                No
              </div>
            </div>
        </div>
      ) : (
        <></>
      )}

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus est
        corrupti, dolore voluptatum et commodi necessitatibus odit consectetur
        nemo exercitationem eveniet inventore doloremque quidem, veniam dolor
        adipisci facilis consequatur voluptatem? Quae eligendi maxime saepe
        adipisci labore nam pariatur reprehenderit, eum a eos quam recusandae
        doloribus neque beatae iste maiores debitis numquam accusantium quasi
        rem temporibus! Quisquam illum eius adipisci itaque. Saepe, sapiente?
      </div>
    </div>
  );
};
