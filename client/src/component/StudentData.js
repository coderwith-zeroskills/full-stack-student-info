import * as React from "react";
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  Icon,
  Typography,
  useTheme,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { tokens } from "../theme";
import studentApis from "../apis/studentApis";
import Modal from "@mui/material/Modal";
import BasicFormControl from "./StudentForm";
import Swal from "sweetalert2";
export default function StudentData() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [student, setStudent] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loader, setLoader] = useState(false);

  const Item = styled(Paper)(({ theme, customProp }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between",
  }));

  const columns = [
    { field: "member_parent_id", headerName: "Id", width: 200 },
    { field: "member_name", headerName: "Name", width: 150 },
    { field: "member_email", headerName: "EMail", width: 150 },
    { field: "age", headerName: "Age", width: 150 },
  ];
  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await axios.get("http://localhost:5001/admin/allstudents");
      if (res.status == 200) {
        setLoader(false);
        //   console.log(res);
        setStudent(res.data.data);
      }
    } catch (err) {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (data) => {
    try {
      const response = await studentApis.studentApis.newStudent(data);
      console.log(response);
  
      if (response.status === 201) {
        fetchData();
        handleClose();
        Swal.fire({
          title: "Data added successfully",
          text: "You clicked the button!",
          icon: "success",
        });
      } else if (response.status === 409) {
        Swal.fire({
          title: "Student already exists",
          text: "Try changing parent ID or email",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Something Went Wrong",
          text: "Try again later",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error adding student:", error);
      Swal.fire({
        title: "Something Went Wrong",
        text: "Try again later",
        icon: "error",
      });
    }
  };
  const AddModal = () => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
    return (
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: 10 }} // Adjust the zIndex value as needed
      >
        <Box sx={style}>
          <Tooltip title="Close">
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row-reverse",
                cursor: "pointer",
              }}
              onClick={handleClose}
            >
              X
            </div>
          </Tooltip>

          <BasicFormControl handleSave={handleSave} />
        </Box>
      </Modal>
    );
  };
  const handleDelete = async (params) => {
    // due to lack of time calling here only
    // Display confirmation dialog using SweetAlert
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, this student will be permanently removed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:5001/admin/deletestudent",
          { studentId: params.member_parent_id },
          {
            headers: {
              "access-control-allow-origin": "*",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log(response);
          fetchData();
          Swal.fire({
            title: "Student Deleted!",
            text: "Student has been successfully deleted.",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to delete student. Please try again.",
          icon: "error",
        });
      }
    } else {
      // Handle the case where user cancels deletion
      Swal.fire({
        title: "Cancelled",
        text: "Deletion cancelled.",
        icon: "info",
      });
    }
  };
  const handleDownload = () => {

  }
  return (
    <>
      <Box m="10px">
        <Box
          m="20px 0 0 0"
          height="50vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <Stack spacing={2}>
            {/* <Button onClick={handleDownload}>Download Student List</Button> */}
            <Item>All Members</Item>
            <Item displayFlex={true}>
              <TextField id="QA-basic" label="QA" variant="outlined" />
              <Button variant="contained" onClick={handleOpen}>
                Add New Member
              </Button>
            </Item>
          </Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Member_Name</TableCell>
                  <TableCell align="right">Member_Email</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student.map((row) => (
                  <TableRow
                    key={row.member_parent_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.member_parent_id}</TableCell>
                    <TableCell align="right">{row.member_name}</TableCell>
                    <TableCell align="right">{row.member_email}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ textAlign: "center" }}
                    >
                      <DeleteOutlineIcon
                        onClick={() => handleDelete(row)}
                        sx={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <AddModal />
      </Box>
    </>
  );
}
