import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unsetUser } from "../../state/userSlice";

export const NavigationPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <button onClick={logOutUser}>Logout</button>
    </div>
  );
};
