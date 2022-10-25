import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { styled } from "@mui/system";
import {
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Modal,
  Box,
} from "@mui/material";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUpload,
} from "react-icons/ai";

function Customer() {
  const [suppliers, setSuppliers] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Form
  const { register, handleSubmit, setValue } = useForm();
  const resetField = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("phoneNumber", "");
    setValue("address", "");
  };

  const onSubmitPost = (data, e) => {
    e.preventDefault();
    handlePost(data);
    resetField();
    setRefresh((f) => f + 1);
  };

  const onSubmitPatch = (data, e) => {
    e.preventDefault();
    handlePatch(data);
    resetField();
    setRefresh((f) => f + 1);
  };

  const BASE_URL = "http://localhost:5000/suppliers/mongoose/";
  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      setSuppliers(res.data);
    });
  }, [refresh]);

  //Delete data
  const handleDelete = (_id) => {
    axios.delete(BASE_URL + _id).then((res) => {
      setRefresh((f) => f + 1);
    });
  };

  //Post new data
  const handlePost = (data) => {
    axios.post(BASE_URL, data);
  };

  //Update data
  const handlePatch = (data) => {
    axios.patch(BASE_URL + selectedRow, data);
  };

  return (
    <CateContainer maxWidth="true">
      <Typography variant="h4">Suppliers</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PhoneNumber</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Feature
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      sx={{
                        backgroundColor: "brown",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                      }}
                      onClick={(e) => handleDelete(item._id, e)}
                    >
                      <AiOutlineDelete />
                    </IconButton>
                    <IconButton
                      sx={{
                        backgroundColor: "cornflowerblue",
                        margin: "0 5px",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                      }}
                      onClick={() => {
                        handleOpen();
                        setSelectedRow(item._id);
                        setValue("name", item.name);
                        setValue("email", item.email);
                        setValue("phoneNumber", item.phoneNumber);
                        setValue("address", item.address);
                      }}
                    >
                      <AiOutlineEdit />
                    </IconButton>
                    <IconButton
                      sx={{
                        backgroundColor: "lightslategray",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                      }}
                    >
                      <AiOutlineUpload />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <PostBox>
          <form onSubmit={handleSubmit(onSubmitPost)}>
            <div>
              <label>Name: </label>
              <input {...register("name")} />
            </div>
            <div>
              <label>Email: </label>
              <input type="email" {...register("email")} />
            </div>
            <div>
              <label>PhoneNumber: </label>
              <input type="number" {...register("phoneNumber")} />
            </div>
            <div>
              <label>Address: </label>
              <input {...register("address")} />
            </div>

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </PostBox>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <PatchBox>
          <form onSubmit={handleSubmit(onSubmitPatch)}>
            <div>
              <label>Name: </label>
              <input {...register("name")} />
            </div>
            <div>
              <label>Email: </label>
              <input type="email" {...register("email")} />
            </div>
            <div>
              <label>PhoneNumber: </label>
              <input type="number" {...register("phoneNumber")} />
            </div>
            <div>
              <label>Address: </label>
              <input {...register("address")} />
            </div>

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </PatchBox>
      </Modal>
    </CateContainer>
  );
}

export default Customer;

const CateContainer = styled(Container)({
  padding: "3rem 0",
  display: "flex",
  flexDirection: "column",
  // justifyContent:'space-between'
});

const PostBox = styled(Box)({
  width: "50%",
  textAlign: "end",

  div: {
    paddingTop: "1rem",
  },

  input: {
    height: "30px",
  },

  button: {
    marginTop: "1rem",
  },
});

const PatchBox = styled(Box)({
  backgroundColor: "#fff",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "50vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  borderRadius: "1rem",

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "1rem",
  },

  input: {
    height: "30px",
  },
});
