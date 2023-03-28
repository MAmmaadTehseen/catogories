import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography, TextField, Stack, Button } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPage() {
    const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);
  const [name, setName] = useState(categoryData ? categoryData.name : "");

  const { id } = useParams();
  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await axios.get(
        `http://localhost:7000/api/getCategory/${id}`
      );
      setCategoryData(data);
      console.log(categoryData);
    };
    fetchCategory();
  }, [id]);

  useEffect(() => {
    if (categoryData) {
      setName(categoryData.name);
    }
  }, [categoryData]);
  const updateCategory = async () => {
    try {
      const {data} = await axios.put(
        `http://localhost:7000/api/updateCategory/${id}`,
        { name }
      );
      if(data.success) navigate("/categories")
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div
      className=""
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "25px",
      }}
    >
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            width: 500,
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "20px", marginY: "7px" }}>
            Category Name
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Categroy Name"
            id="fullWidth"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ marginY: "15px" }}
            onClick={updateCategory}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
