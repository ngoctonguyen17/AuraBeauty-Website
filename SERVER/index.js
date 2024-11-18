const express = require('express');
const app = express();
const port = 3002;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require('mongodb');

app.use(morgan("combined"));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function start() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Dừng ứng dụng nếu kết nối thất bại
    }
}

const database = client.db("AuraBeauty");
const userCollection = database.collection("users");

// -------------User APIs-------------

// API: Lấy tất cả Users
app.get("/users", async (req, res) => {
    try {
        const result = await userCollection.find({}).sort({ createdAt: -1 }).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Error fetching users", error: error.message });
    }
});

// API: Lấy User theo ID
app.get("/users/:id", async (req, res) => {
    try {
        const o_id = new ObjectId(req.params.id);
        const result = await userCollection.findOne({ _id: o_id });
        if (!result) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(result);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).send({ message: "Error fetching user", error: error.message });
    }
});

// API: Thêm mới User
app.post("/users", async (req, res) => {
  try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
          return res.status(400).send({ message: "Missing required fields" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
          name,
          email,
          password: hashedPassword,
          admin: role || 'user',
          createdAt: new Date()
      };
      await userCollection.insertOne(user);
      res.status(201).send(user);
  } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).send({ message: "Error adding user", error: error.message });
  }
});
// API: Cập nhật User
app.put("/users/:id", async (req, res) => {
    try {
        const o_id = new ObjectId(req.params.id);
        const updatedUser = {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password, // Nên mã hóa mật khẩu
                role: req.body.role,
                updatedAt: new Date()
            }
        };
        const result = await userCollection.updateOne({ _id: o_id }, updatedUser);
        if (result.matchedCount === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: 'User updated successfully' });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ message: "Error updating user", error: error.message });
    }
});

// API: Xóa User
app.delete("/users/:id", async (req, res) => {
    try {
        const o_id = new ObjectId(req.params.id);
        const result = await userCollection.deleteOne({ _id: o_id });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ message: "Error deleting user", error: error.message });
    }
});

// Khởi động server và kết nối đến MongoDB
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    start(); // Kết nối với database khi server bắt đầu chạy
});
