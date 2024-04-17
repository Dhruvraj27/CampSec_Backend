const express = require("express");
const {
  registerGateKeeper,
  getAllgateKeeperData,
  updateGateKeeperData,
  updateGateKeeperControlledData,
} = require("../Controller/gateKeeperController/gatekeeperController");
const authMiddleWare = require("../middlewares/authMiddleWares/authMiddleWare");
const GateKeeperRoutes = express.Router();

GateKeeperRoutes.post(
  "/api/v1/register-gate-keeper",
  authMiddleWare,
  registerGateKeeper
);
GateKeeperRoutes.get(
  "/api/v1/getAllgateKeeperData",
  authMiddleWare,
  getAllgateKeeperData
);
GateKeeperRoutes.put(
  "/api/v1/updateGateKeeperData/:id",
  authMiddleWare,
  updateGateKeeperData
);
GateKeeperRoutes.put(
  "/api/v1/updateGateKeeperControllData/:id",
  authMiddleWare,
  updateGateKeeperControlledData
);
module.exports = GateKeeperRoutes;
