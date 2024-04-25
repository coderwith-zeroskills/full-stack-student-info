import express from "express";
import client from "../client.cjs";
const router = express.Router();

router.get("/", (req, res) => {
  client.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      res.json({ message: result.rows });
      // console.log("Query result:", result.rows);
    }
  });
  //console.log(res);
});
export default router;
