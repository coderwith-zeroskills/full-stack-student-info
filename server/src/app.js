import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import client from "./client.cjs";
import * as middlewares from "./middlewares.js";

import allstudents from "./api/allstudents.js";
import newstudent from "./api/newstudent.js";
import singlestudent from "./api/singlestudent.js";
import deletestudent from "./api/deletestudent.js";
// require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({
    message: "API Started...",
  });
});

app.use("/admin/allstudents", allstudents);
app.use("/admin/allstudents", newstudent);
app.use("/admin/singlestudent", singlestudent);
app.use("/admin/deletestudent", deletestudent);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
export default app;
