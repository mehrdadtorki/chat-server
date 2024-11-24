import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// routes
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
// import PostRoute from "./Routes/PostRoute.js";
// import UploadRoute from "./Routes/UploadRoute.js";
import ChatRoute from "./Routes/ChatRoute.js";
import MessageRoute from "./Routes/MessageRoute.js";

const app = express();
// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside public folder
app.use(express.static("public"));
app.use("/images", express.static("images"));

dotenv.config();
const PORT = process.env.PORT;
// const PORT = 5000;

const CONNECTION = process.env.MONGODB_CONNECTION;
// const CONNECTION =
// "mongodb+srv://mehrdadtorki1381:mhrdd5610@cluster-chat.wacnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Chat";
mongoose
  .connect(CONNECTION, {
    connectTimeoutMS: 10000,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening at Port ${PORT}`));
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Exit process if DB connection fails
  });

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
// app.use("/posts", PostRoute);
// app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
