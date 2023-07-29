import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <h1 className="text-3xl">NavBar</h1>
      <Outlet />
    </>
  );
}

export default App;
