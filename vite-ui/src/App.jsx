import "./App.css";
import { PageRoutes } from "./components/PageRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <PageRoutes />
    </>
  );
}

export default App;
