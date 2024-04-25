// singlestudent
import express from "express";
import client from "../client.cjs";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { studentId } = req.body;

    // Execute the SELECT query
    const query = `
    SELECT Students.*, marks.mark
    FROM Students
    LEFT JOIN marks ON marks.student_parent_id = Students.member_parent_id
    WHERE Students.member_parent_id = $1
  `;
    const result = await client.query(query, [studentId]);

    // Check if any student was found
    if (result.rows.length > 0) {
      res.json({ student: result.rows[0] });
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error("Error retrieving student:", error.detail);
    res.status(500).json({
      error: "An error occurred while retrieving student",
      message: error.detail,
    });
  }
});
export default router;
