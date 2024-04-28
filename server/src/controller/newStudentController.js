import client from "../client.cjs";

const isValidate = (req, res, next) => {
  if (!req.body.member_name || !req.body.member_email || !req.body.age || !req.body.member_parent_id) {
    return res.status(400).json({ status: "Bad Request", message: "Please provide all field" })
  }
  next();
}
const newStudent = async (req, res) => {
  try {
    const { member_name, member_email, age, member_parent_id } = req.body;

    // Check if student with the same email already exists
    const existingStudent = await client.query(
      `SELECT * FROM Students WHERE member_parent_id = $1`,
      [member_parent_id]
    );
console.log(existingStudent)
    if (existingStudent.rows.length > 0) {
      return res.status(409).json({ status: 409, message: "Student with this email already exists" });
    }

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

    return res.status(201).json({ status: 201, message: "Data added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};


export { newStudent, isValidate };
