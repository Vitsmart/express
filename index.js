const express = require('express');
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./post/users");
const categoryRoute = require("./post/categories");
const multer = require("multer")

app.use(express.json());

dotenv.config();
mongoose.connect(process.env.MONGO_URL,{
     useNewUrlParser: true,
     useUnifiedTypology: true,
    
}).then(console.log("connected to MongoDB")).catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


app.listen("5000", () => {
console.log("Backend is running on port 5000");
});

