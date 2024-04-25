// singlestudent
import express from "express";
import client from "../client.cjs";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { studentId } = req.body;
    const query = `
    SELECT Students.*, marks.mark
    FROM Students
    LEFT JOIN marks ON marks.student_parent_id = Students.member_parent_id
    WHERE Students.member_parent_id = $1
  `;
    const result = await client.query(query, [studentId]);
    if (result.rows.length > 0) {
      await client.query("BEGIN");

      // Delete from the marks table first
      const deleteMarksQuery = `
              DELETE FROM marks
              WHERE student_parent_id = $1
            `;
      await client.query(deleteMarksQuery, [studentId]);

      // Now, delete the student from the Students table
      const deleteStudentQuery = `
              DELETE FROM Students
              WHERE member_parent_id = $1
            `;
      await client.query(deleteStudentQuery, [studentId]);

      // Commit the transaction
      await client.query("COMMIT");

      res.json({
        message: "Student and associated marks deleted successfully",
      });
    } else {
      res.status(404).json({ error: "Student not found" });
    }
    // Begin a transaction
  } catch (error) {
    // Rollback the transaction if any error occurs
    await client.query("ROLLBACK");
    console.error("Error deleting student and marks:", error.detail);
    res.status(500).json({
      error: "An error occurred while deleting student and marks",
      message: error.detail,
    });
  }
});
export default router;
