import client from "../client.cjs";

const getAllStudents = (req, res) => {
    client.query("SELECT * FROM students", (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            res.status(500).json({ status: "error", message: "Failed to fetch students" });
        } else {
            res.status(200).json({ status: "success", data: result.rows });
        }
    });
};

export { getAllStudents };
