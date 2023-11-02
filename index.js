const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleWare
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tgrk550.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tgrk550.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const galleryDataCollection = client
      .db("galleryDB")
      .collection("galleryData");

    // post gallery data(image) to database
    app.post("/upload-image", async (req, res) => {
      const imageData = req.body;
      console.log(imageData);
      const result = await galleryDataCollection.insertOne(imageData);
      res.send(result);
    });

    // get gallery data(image) from database
    app.get("/get-gallery-images", async (req, res) => {
      const result = await galleryDataCollection.find().toArray();
      res.send(result);
    });

    app.patch("/update-selected-image/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedImage = req.body;
      const image = {
        $set: {
          isChecked: updatedImage.isChecked,
        },
      };
      const result = await galleryDataCollection.updateOne(
        filter,
        image,
        options
      );
      res.send(result);
    });

    app.patch("/unselect-all-images", async (req, res) => {
      const filter = { isChecked: true }; // Filter for all selected images
      const image = {
        $set: {
          isChecked: false, // Set the isChecked property to false
        },
      };
      const result = await galleryDataCollection.updateMany(filter, image);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Image gallery server is running");
});

app.listen(port, () => {
  console.log(`Image gallery is running on port: ${port}`);
});
