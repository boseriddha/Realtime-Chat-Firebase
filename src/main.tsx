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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Dashboard />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/add" element={<AddFriend />} />
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
