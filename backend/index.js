const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const selectionsRoute = require("./routes/selectionsRoute");
const userRoute = require("./routes/userRoute");
dotenv.config();

//Mongo Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`DBConnection Successfull`))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

//Routes==
app.use("/api/sectors", selectionsRoute);
app.use("/api/users", userRoute);

//Starting the app
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`server running on PORT: ${port}`);
});
