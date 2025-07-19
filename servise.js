// 📁 backend/server.js
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = "todoapp";

app.use(cors());
app.use(express.json());

let db;

// Connect to MongoDB
MongoClient.connect(mongoURL, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/todos", async (req, res) => {
  const todos = await db.collection("todos").find().toArray();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const result = await db.collection("todos").insertOne({ title, completed: false });
  res.json({ insertedId: result.insertedId });
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;
  const result = await db.collection("todos").updateOne(
    { _id: new ObjectId(id) },
    { $set: { completed } }
  );
  res.json({ updated: result.modifiedCount === 1 });
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.collection("todos").deleteOne({ _id: new ObjectId(id) });
  res.json({ deleted: result.deletedCount === 1 });
});

app.listen(port, () => {
  console.log(`🚀 Todo API running at http://localhost:${port}`);
});
