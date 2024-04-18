const gateKeeperData = require("../../Schema/GateKeeperSchema/GateKeeper");
const registerGateKeeper = async (req, res) => {
  const {
    name,
    entryTime,
    exitTime,
    purposeOfComing,
    contactNumber,
    vehicleNumber,
    signURL,
  } = req.body;
  try {
    let response = new gateKeeperData({
      name,
      entryTime,
      exitTime,
      purposeOfComing,
      contactNumber,
      vehicleNumber,
      userId: req?.id,
      signURL,
    });
    response = await response.save();
    return res
      .status(200)
      .json({ message: "Entry added successfully", data: response });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong", error: error });
    console.log(error);
  }
};

const getAllgateKeeperData = async (req, res) => {
  try {
    let response = await gateKeeperData.find({ userId: req.id });
    let newrespo = [...response].sort((a, b) => b.createdAt - a.createdAt);
    console.log(newrespo, "show the response new ");
    return res.status(200).json({
      message: "Gatekeeper data fetched successully",
      data: newrespo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const updateGateKeeperData = async (req, res) => {
  try {
    let { id } = req.params;
    let { exitTime } = req.body;
    const response = await gateKeeperData.findByIdAndUpdate(
      { _id: id },
      { exitTime: exitTime },
      { new: true }
    );
    console.log(response, "Show the response here for the update of the Doc");
    return res
      .status(200)
      .json({ data: response, message: "Entry updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateGateKeeperControlledData = async (req, res) => {
  try {
    let { id } = req?.params;
    let { name, purposeOfComing, contactNumber, vehicleNumber } = req.body;
    let payload = {
      name,
      purposeOfComing,
      contactNumber,
      vehicleNumber,
    };
    let response = await gateKeeperData.findByIdAndUpdate(
      { _id: id },
      payload,
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Entry updated successfully", data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = {
  registerGateKeeper,
  getAllgateKeeperData,
  updateGateKeeperData,
  updateGateKeeperControlledData,
};