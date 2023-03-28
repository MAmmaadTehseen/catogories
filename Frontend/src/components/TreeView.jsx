import { useState, useEffect } from "react";
import axios from "axios";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Typography,
  Stack,
  Fab,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import "./TreeView.css";
// import MyModal from "./AddModal";

const TreeViews = ({ AllCategories }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCatgeoirs = async () => {
      const data = await axios.get("http://localhost:7000/api/deepSearch");
      setCategories(data.data);
    };

    fetchCatgeoirs();
    console.log(categories);
  }, []);

  const renderTreeItems = (node) => (
    <TreeItem key={node.id} nodeId={node.name} label={node.name}>
      {Array.isArray(node.children)
        ? node.children.map((child) => renderTreeItems(child))
        : null}
    </TreeItem>
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [optionValue, setOptionValue] = useState("");
  // const [optionCategories, setOptionCategories] = useState([]);

  console.log(AllCategories);
  console.log(optionValue);
  const [categoryName, setCategoryName] = useState("");
  const addCategory = async (parent_id = null) => {
    if (optionValue !== "") {
      parent_id = optionValue;
      console.log(parent_id)
    }
    try {
      console.log(parent_id)
      const response = await axios.post(
        `http://localhost:7000/api/addCategory`,
        { name: categoryName, parent_id: optionValue }
      );
      console.log(response)
      if(response.data.success) {window.location.reload()}
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    // <div className="mainDiv">
    <div>
      <Stack
        sx={{
          fontSize: "24px",
          marginY: "7px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            marginY: "7px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Category Name
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginY: "25px",
          }}
        >
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ textAlign: "left", font: 24 }}
          >
            {categories.map((node) => renderTreeItems(node))}
          </TreeView>
        </Box>
      </Stack>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 50,
          left: "auto",
          position: "fixed",
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      {
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Category
            </Typography>
            <Box
              sx={{
                width: "100%",
                marginY: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Enter Category"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <TextField
                style={{ marginTop: 20 }}
                label="Categories"
                fullWidth
                select
                variant="outlined"
                value={optionValue}
                id="country"
                margin="dense"
                helperText="Please select your country"
                onChange={(e) => {
                  setOptionValue(e.target.value);
                }}
              >
                {AllCategories.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button variant="contained" onClick={addCategory}>
                ADD CATEGORY
              </Button>
            </Box>
          </Box>
        </Modal>
      }
    </div>
  );
};

export default TreeViews;
