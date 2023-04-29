const UserData = require("../models/userDataModel");

const router = require("express").Router();

//create user data
router.post("/create-userdata", async (req, res) => {
  const newUser = new UserData(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user data
router.get("/get-userdata/:id", async (req, res) => {
  try {
    const user = await UserData.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update user data
router.put("/update-userdata/:id", async (req, res) => {
  // const newUser = new UserData(req.body);
  try {
    const updatedUserData = await UserData.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: `Updated Success`, updatedUserData });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
