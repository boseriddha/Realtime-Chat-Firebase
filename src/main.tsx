import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Provider from "./components/Provider.tsx";
import Dashboard from "./screens/Dashboard.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import LoginScreen from "./screens/LoginScreen.tsx";
import UserProvider from "./context/UserContext.tsx";
import AddFriend from "./screens/AddFriend.tsx";
import PrivateRoutes from "./components/PrivateRoutes.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="" element={<PrivateRoutes />}>
        <Route index={true} path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddFriend />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </UserProvider>
);
