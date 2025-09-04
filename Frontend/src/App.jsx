import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Find from "./pages/Find";
import Post from "./pages/Post";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Details from "./pages/Details";
import FindLand from "./pages/FindLand";
import PostLand from "./pages/PostLand";
import LandDetails from "./pages/LandDetails";
import "./App.css"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<Find />} />
        <Route path="/post" element={<Post />} />
        <Route path="/#about" element={<About />} />
        <Route path="/find/details/:id" element={<Details />} />
        {/* New Routes for Lands */}
        <Route path="/find-land" element={<FindLand />} />
        <Route path="/post-land" element={<PostLand />} />
        <Route path="/land/details/:id" element={<LandDetails />} />
      </Routes>
    </>
  );
}

export default App;
