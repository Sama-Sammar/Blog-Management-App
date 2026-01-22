import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./global.css";
import { initBlogsStorage } from "./utils/blogsStorage";
import store from "./store/store";
import "./i18n";

initBlogsStorage();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
