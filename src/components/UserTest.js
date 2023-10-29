import { useSelector } from "react-redux";

export const UserTest = () => {
  const user = useSelector((state) => state.userSlice.user);

  const showState = () => {
    console.log(user);
  };

  return <button onClick={showState}>Click to show the state!</button>;
};
