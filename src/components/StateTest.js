import { useSelector } from "react-redux";

export const StateTest = () => {
  const user = useSelector((state) => state.userSlice.user);

  const showState = () => {
    console.log(user);
  };

  return <button onClick={showState}>Click to show the state!</button>;
};
