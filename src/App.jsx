import { RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import router from "./config/router-config";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
