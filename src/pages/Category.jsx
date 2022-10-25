import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUpload,
} from "react-icons/ai";
import { WEB_SERVER_URL } from "../constants/URL";

function Category() {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  //OPEN/CLOSE DIALOG
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  //OPEN/CLOSE Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //Form
  const { register, handleSubmit, setValue } = useForm();
  const resetField = () => {
    setValue("name", "");
    setValue("description", "");
  };

  const onSubmitPost = (data, e) => {
    e.preventDefault();
    handlePost(data);
    resetField();
    setRefresh((f) => f + 1);
    toast.success("Successfully Post New Data!");
  };

  const onSubmitPatch = (data, e) => {
    e.preventDefault();
    handlePatch(data);
    handleCloseModal();
    resetField();
    setRefresh((f) => f + 1);
    toast.success("Successfully Update Data!");
  };

  const collectionName = "categories";
  const BASE_URL = `${WEB_SERVER_URL}/${collectionName}`;
  const UPLOAD_URL = `${WEB_SERVER_URL}/upload/${collectionName}`;

  //GET DATA
  useEffect(() => {
    axios.get(`${BASE_URL}/mongoose/`).then((res) => {
      setCategories(res.data);
    });
  }, [refresh]);

  //Delete data
  const handleDelete = async () => {
    await axios.delete(`${BASE_URL}/mongoose/` + selectedRow).then(() => {
      setRefresh((f) => f + 1);
      toast.success("Successfully Delete!");
    });
  };

  //Post new data
  const handlePost = async (data) => {
    await axios.post(`${BASE_URL}/mongoose/`, data);
  };

  //Update data
  const handlePatch = async (data) => {
    await axios.patch(`${BASE_URL}/mongoose/` + selectedRow, data);
  };

  const handleUploadImg = async (_id, e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    await axios.post(UPLOAD_URL + "/" + _id, formData).then(() => {
      setRefresh((f) => f + 1);
      toast.success("Successfully Upload Image!");
    });
  };

  return (
    <CateContainer maxWidth="true">
      <Toaster position="top-center" reverseOrder={false} />

      <Typography variant="h4">Categories</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "1rem", fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Feature
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">
                    <img
                      src={`${WEB_SERVER_URL}${item.imageUrl}`}
                      alt={item.name}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "contain",
                        borderRadius: "10px",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">
                    {/* DELETE */}
                    <IconButton
                      sx={{
                        backgroundColor: "brown",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                      }}
                      onClick={() => {
                        handleOpenDialog();
                        setSelectedRow(item._id);
                      }}
                    >
                      <AiOutlineDelete />
                    </IconButton>
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                      <DialogTitle sx={{ color: "black" }}>
                        Are you sure?
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          The data will be deleted immediately, think carefully!
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseDialog}>Disagree</Button>
                        <Button
                          onClick={() => {
                            handleDelete(selectedRow);
                            handleCloseDialog();
                          }}
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* EDIT */}
                    <IconButton
                      sx={{
                        backgroundColor: "cornflowerblue",
                        margin: "0 5px",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                      }}
                      onClick={() => {
                        handleOpenModal();
                        setSelectedRow(item._id);
                        setValue("name", item.name);
                        setValue("description", item.description);
                      }}
                    >
                      <AiOutlineEdit />
                    </IconButton>
                    <Modal open={openModal} onClose={handleCloseModal}>
                      <PatchBox>
                        <form onSubmit={handleSubmit(onSubmitPatch)}>
                          <div>
                            <label>Name: </label>
                            <input {...register("name")} />
                          </div>

                          <div>
                            <label>Description: </label>
                            <input {...register("description")} />
                          </div>

                          <Button type="submit" variant="contained">
                            Submit
                          </Button>
                        </form>
                      </PatchBox>
                    </Modal>

                    {/* UPLOAD IMAGE */}
                    <IconButton
                      sx={{
                        backgroundColor: "lightslategray",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                      }}
                      component="label"
                    >
                      <input
                        hidden
                        type="file"
                        onChange={(e) => handleUploadImg(item._id, e)}
                      />
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
              <label>Description: </label>
              <input {...register("description")} />
            </div>

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </PostBox>
      </TableContainer>
    </CateContainer>
  );
}

export default Category;

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
