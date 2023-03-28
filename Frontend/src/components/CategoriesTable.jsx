import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { FormControlLabel, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { blue, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function CategoriesTable() {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3, width: 70 },
    { field: "name", headerName: "Category Name", flex: 0.3, width: 130 },
    { field: "parent_id", headerName: "Parent ID", flex: 0.2, width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        // console.log(params)
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            {/* <MatEdit index={params.row.id} /> */}
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={() => {
                handleEditClick(params.row.id);
              }}
            >
              <EditIcon style={{ color: blue[500] }} />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={() => {
                handleDeleteClick(params.row.id);
              }}
            >
              <DeleteOutlineIcon style={{ color: red[500] }} />
            </IconButton>
          </div>
        );
      },
    },
  ];
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:7000/api/getCategories"
      );
      setCategories(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEditClick = async (id) => {
    navigate("/categories/" + id);
  };

  const handleDeleteClick = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:7000/api/deleteCategory/${id}`
    );
    if (data.success) fetchCategories();
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{ height: 400, width: "40%", margin: "25px auto" }}>
      <h1 style={{ color: "black", opacity: 0.8 }}>Categories</h1>
      <DataGrid
        rows={categories}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
