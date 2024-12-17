// import "dotenv/config";
import env from "dotenv";
import express from "express";
import { connection } from "./config/db.js";
import router from "./routes/tasks-routes.js";
import cors from "cors";
import {
  loginController,
  registerController,
} from "./controllers/auth-controller.js";

const app = express();
env.config();
connection();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.post("/register", registerController);
app.post("/login", loginController);
app.use("/tasks", router);

app.listen(port, () => console.log(`server running on port ${port}`));

///auth endpoint
//post/register
//post/login

//tasks endpoint
//post/tasks
//GET/tasks
//GET/tasks/:id
//patch/tasks/:id
//delete/tasks/:id

//Get/tasks/all
