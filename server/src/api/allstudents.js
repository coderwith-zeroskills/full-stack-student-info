import express from "express";
import client from "../client.cjs";
const router = express.Router();

router.get("/", (req, res) => {
  client.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      res.status(200).json({ status:"success",data: result.rows });
    }
  });
  //console.log(res);
});
export default router;
