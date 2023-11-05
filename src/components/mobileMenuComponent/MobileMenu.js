import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unsetUser } from "../../state/userSlice";

export const MobileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/");
  };

  return <button onClick={logOutUser}>Log Out</button>;
};
