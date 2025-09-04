import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { api } from "../config";

export default function PostLand() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    area: "",
    price: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post(`${api}/land`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Land posted successfully!");
    } catch (err) {
      console.log(err);
      alert("Error posting land");
    }
  };

  return (
    <main id="postLand">
      <Navbar />
      <section>
        <br /><br /><br />
        <h1 className="lfh1">Post Land for Sale</h1>
        <div className="form-container">
          <h2>Please fill all the required fields</h2>
          <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input-container">
              <label>Name</label>
              <input type="text" name="name" onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input type="email" name="email" onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label>Phone</label>
              <input type="tel" name="phoneno" onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label>Area</label>
              <input type="text" name="area" onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label>Price (₹)</label>
              <input type="text" name="price" onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label>Description</label>
              <textarea name="description" onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label>Upload Image</label>
              <input type="file" name="file" onChange={handleChange} />
            </div>
            <div className="input-container">
              <button type="submit" className="submitbtn">
                POST LAND
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
