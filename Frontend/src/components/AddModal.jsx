import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from "@mui/material";

const AddModal = ({ open, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = () => {
    // Add your submit logic here
    console.log(categoryName, selectedOption);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: 16, background: "white" }}>
        <Typography variant="h6" gutterBottom>
          Add Category
        </Typography>
        <TextField
          fullWidth
          placeholder="Category Name..."
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">Category Type</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};
export default AddModal;