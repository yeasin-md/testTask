const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    agreed: { type: Boolean },
    selectedSectors: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserData", UserDataSchema);
