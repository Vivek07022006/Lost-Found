import { useEffect, useState, CSSProperties } from "react";
import axios from "axios";
import { api } from "../config";
import LandCard from "../components/LandCard";
import Navbar from "../components/Navbar";
import HashLoader from "react-spinners/HashLoader";
import AOS from "aos";
import "aos/dist/aos.css";

export default function FindLand() {
  const [lands, setLands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 750 });
  }, []);

  const override: CSSProperties = {
    display: "block",
    borderColor: "#fdf004",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async (query = "") => {
    try {
      const res = await axios.get(
        `${api}/land${query ? "?area=" + query : ""}`
      );
      setLands(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchLands(search);
  };

  return (
    <main id="findpage">
      <Navbar />
      <section>
        <h1 className="lfh1">Available Lands</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search by area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="item-container">
          <HashLoader
            color="#fdf004"
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />

          {lands.reverse().map((land, index) => (
            <LandCard
              key={index}
              id={land._id}
              area={land.area}
              price={land.price}
              description={land.description}
              image={land.image}
            />
          ))}

          <div className="extraItem"></div>
          <div className="extraItem"></div>
          <div className="extraItem"></div>
        </div>
      </section>
    </main>
  );
}
