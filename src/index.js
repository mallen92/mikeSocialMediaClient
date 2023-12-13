/*------------- 3RD PARTY IMPORTS -------------*/
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

/*-------------- CONFIG IMPORTS --------------*/
import { store } from "./app/store";

/*-------------- COMPONENT IMPORTS --------------*/
import App from "./App";

/*-------------- CONFIGURATIONS --------------*/
const root = ReactDOM.createRoot(document.getElementById("root"));

/*-------------- JSX --------------*/
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
