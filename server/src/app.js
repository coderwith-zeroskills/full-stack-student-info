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
import downloadList from "./api/downloadList.js";
// require("dotenv").config();

const app = express();

const addRequestTime=(req,res,next)=>{
  req.requestTime=new Date().toISOString()
  next()
}
 
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(addRequestTime)

app.get("/", async (req, res) => {
  console.log(req.requestTime)
  res.json({
    message: "API Started...",
  });
});

app.use("/admin/allstudents", allstudents);
app.use("/admin/newstudent", newstudent);
app.use("/admin/singlestudent", singlestudent);
app.use("/admin/deletestudent", deletestudent);
app.use("/admin/download",downloadList)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
export default app;
