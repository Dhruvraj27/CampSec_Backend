const express = require("express");
const cron = require("node-cron");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
const routes = require("./Router/userRoutes");
const connectDB = require("./Db");
const GateKeeperRoutes = require("./Router/gateKeeper.user");
const app = express();
const PORT = 4500;
const gateKepperDatas = require("./Schema/GateKeeperSchema/GateKeeper");
const getEntryTime = () => {
  let year = new Date().getFullYear();
  let day = new Date().getDate();
  let month = new Date().getMonth();
  let Aslihours = new Date().getHours();
  let hours = new Date().getHours() % 12 || 12;
  let Minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();
  let getDate = `${day}-${month}-${year}`;
  let getCurrentTime = `${hours}:${Minutes}:${seconds} ${Aslihours < 12 ? "AM" : "PM"
    }`;
  return `${getDate} ${getCurrentTime}`;
};

cron.schedule("0 0 * * *", async () => {
  let response = await gateKepperDatas.updateMany(
    { exitTime: "" },
    { $set: { exitTime: getEntryTime() } }
  );
});
app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);
app.use("/", GateKeeperRoutes);
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on the PORT : ${PORT}`);
});
