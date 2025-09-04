import express, { request } from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Item } from "./models/itemmodel.js";
import { Land } from "./models/landmodel.js";
import cors from "cors";
import { createRequire } from "module";
const require = createRequire(import.meta.url);//to require require for multer


const app = express();
app.use(express.json());
app.use(cors());
app.use('/files',express.static("files"))

//================================================== multer ==============================================

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null,uniqueSuffix+file.originalname);
  },
});

const upload = multer({ storage: storage });



app.get("/land", async (req, res) => {
  try {
    const { area } = req.query;
    let query = {};
    if (area) {
      query.area = { $regex: area, $options: "i" }; // case-insensitive search
    }
    const lands = await Land.find(query);
    return res.status(200).json({
      count: lands.length,
      data: lands,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// ============================== POST land ================================
app.post("/land", upload.single("file"), async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phoneno ||
      !req.body.area ||
      !req.body.price ||
      !req.body.description
    ) {
      return res.status(400).send({ message: "All fields required" });
    }

    const newLand = {
      name: req.body.name,
      email: req.body.email,
      phoneno: req.body.phoneno,
      area: req.body.area,
      price: req.body.price,
      description: req.body.description,
      image: req.file?.filename,
    };

    const land = await Land.create(newLand);
    return res.status(200).send(land);
  } catch (error) {
  console.log("Error creating land:", error);
  res.status(500).send({ message: error.message });
}
});

// ============================== GET by ID ================================
app.get("/land/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const land = await Land.findById(id);
    return res.status(200).json(land);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// ============================== DELETE land ================================
app.delete("/land/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Land.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Land not found" });
    }
    return res.status(200).send({ message: "Land deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// ============================== get =================================

app.get("/item", async (req, res) => {
  try {
    const items = await Item.find({});
    return res.status(200).json({
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// ===============================post===================================

app.post("/item",upload.single("file"), async (req,res)=>{
  console.log(req.file);
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phoneno ||
      !req.body.title ||
      !req.body.description
    ) {
      return res.status(400).send({ message: "all fields sent" });
    }

   const newItem = {
      name: req.body.name,
      email: req.body.email,
      phoneno: req.body.phoneno,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
    };
   const item=await Item.create(newItem);
   return res.status(200).send(item);

  }catch(error){
    console.log(error);
    res.status(500).send("error");
  }

})


// =================================-get id ==================================

app.get("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    return res.status(200).json(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// =================================== delete ============================

app.delete("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Item.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).send({ message: "Item deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
