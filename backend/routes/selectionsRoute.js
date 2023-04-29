const SelectionSectors = require("../models/SelectionsModel");

const router = require("express").Router();

//create sectors
router.post("/create-sectors", async (req, res) => {
  const newSector = new SelectionSectors(req.body);

  try {
    const savedSector = await newSector.save();
    res.status(200).json(savedSector);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get sectors
router.get("/get-sectors", async (req, res) => {
  try {
    const AllSectors = await SelectionSectors.find();
    res.status(200).json(AllSectors);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
