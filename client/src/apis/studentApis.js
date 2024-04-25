import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5001",
});
export default {
  studentApis: {
    deleteStudent: async (params) => {
      console.log(params);
    },
    getAllStudent: async () => {},
    newStudent: async (data) => {
      const response = client.post("/admin/newstudent", data, {
        headers: {
          "access-control-allow-origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response;
    },
  },
};
