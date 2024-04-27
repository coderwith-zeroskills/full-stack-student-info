import client from "../client.cjs";

const isValidate=(req,res,next)=>{
if(!req.body.member_name||!req.body.member_email||!req.body.age||!req.body.member_parent_id){
    return res.status(400).json({status:"Bad Request",message:"Please provide all field"})
}
next();
}
const newStudent = async(req, res) => {
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
        return res.json({status:"failure",message:'Something went wrong!'})
      }
};

export { newStudent,isValidate };
