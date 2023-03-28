// import './App.css';
import { Routes, Route } from "react-router-dom";
import TreeView from "./components/TreeView";
import Navbar from "./components/Navbar";
import CategoriesTable from "./components/CategoriesTable";
import EditPage from "./components/EditPage";
import Modal from "./components/AddModal";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
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
    fetchCategories()
  }, []);
  return (
    <>
      <Navbar />
      {/* <Modal /> */}
      <Routes>
        <Route path="/" element={<TreeView AllCategories={categories} />} />
        <Route path="/categories" element={<CategoriesTable />} />
        <Route path="/categories/:id" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
