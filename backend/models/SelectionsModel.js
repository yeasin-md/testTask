const mongoose = require("mongoose");

const SelectionsSchema = new mongoose.Schema({
  sectors: [
    {
      sectorName: String,
      value: Number,
    },
    { timestamps: true },
  ],
});

module.exports = mongoose.model("SelectionSectors", SelectionsSchema);
