import express from "express";
import client from "../client.cjs";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { member_name, member_email, age, member_parent_id } = req.body;

    // Execute the INSERT query
    const query = `
        INSERT INTO Students (member_name, member_email, age, member_parent_id) 
        VALUES ($1, $2, $3, $4)
      `;
    await client.query(query, [
      member_name,
      member_email,
      age,
      member_parent_id,
    ]);

    res.status(200).json({ message: "Data added successfully", status: 200 });
  } catch (error) {
    console.error("Error adding data:", error.detail);
    res.status(500).json({
      error: "An error occurred while adding data",
      message: error.detail,
    });
  }
});
export default router;
