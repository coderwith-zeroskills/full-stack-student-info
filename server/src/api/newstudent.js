import express from "express";
import client from "../client.cjs";
const router = express.Router();

import { newStudent,isValidate } from "../controller/newStudentController.js";
// chaining multiple middleware
router.post("/",isValidate,newStudent);
export default router;
