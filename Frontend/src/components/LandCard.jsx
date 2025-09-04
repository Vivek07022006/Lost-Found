import { useState, useEffect } from "react";
import { api } from "../config";
import noImage from "../assets/no-image.png";
import axios from "axios";

export default function LandCard(props) {
  const [image, setImage] = useState(noImage);

  useEffect(() => {
    if (props.image) {
      axios
        .get(`${api}/files/${props.image}`)
        .then(() => setImage(`${api}/files/${props.image}`))
        .catch(() => setImage(noImage));
    }
  }, [props.image]);

  return (
    <a href={"/land/details/" + props.id} data-aos="fade-up">
      <div className="card">
        <div className="card-img">
          <img src={image} alt="land" />
        </div>
        <div className="card-desc">
          <h2>{props.area}</h2>
          <p>₹ {props.price}</p>
          <p>{props.description}</p>
        </div>
      </div>
    </a>
  );
}
