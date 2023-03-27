const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const categoryRoutes = require("./routes/category");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.use("/api",categoryRoutes)


app.listen(7000, () => {
  console.log(`Server is listening on port: 7000`);
});
