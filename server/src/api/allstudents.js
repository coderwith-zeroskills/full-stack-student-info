import express from "express";
import client from "../client.cjs";
import { getAllStudents } from "../controller/allstudentController.js";
const router = express.Router();

router.get("/", getAllStudents);
export default router;
