import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../config";
import noImage from "../assets/no-image.png";

export default function LandDetails() {
  const { id } = useParams();
  const [land, setLand] = useState(null);

  useEffect(() => {
    axios.get(`${api}/land/${id}`)
      .then((res) => setLand(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!land) return <h2>Loading...</h2>;

  return (
    <div className="details-container">
      <h1>{land.area}</h1>
      <img
        src={land.image ? `${api}/files/${land.image}` : noImage}
        alt="land"
      />
      <p><strong>Price:</strong> ₹ {land.price}</p>
      <p><strong>Description:</strong> {land.description}</p>
      <p><strong>Posted by:</strong> {land.name} ({land.email}, {land.phoneno})</p>
    </div>
  );
}
