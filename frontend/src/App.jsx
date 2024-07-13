import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import NoteDetail from "./pages/NoteDetail";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import RedirectRoute from "./components/RedirectRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RedirectRoute />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/create-note" element={<CreateNote />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
