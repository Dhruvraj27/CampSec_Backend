const jwt = require("jsonwebtoken");
const authMiddleWare = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "Unauthorized Access" });
    }
    let tokenOnly = token?.split(" ")?.[1];
    let verifyToken = jwt.verify(tokenOnly, process.env.SECRET_KEY);
    if (!verifyToken) {
      res.status(400).json({ message: "User is not Authorized " });
    }
    req.id = verifyToken?.id;
    next();
  } catch (error) {
    res.status(500).json({ message: "UnAuthorized Access" });
    console.log(error);
  }
};

module.exports = authMiddleWare;

// const jwt = require("jsonwebtoken");
// const authMiddleWare = async (req, res, next) => {
//   try {
//     let token = req.headers.authorization;
//     if (!token) {
//       return res.status(400).json({ message: "Unauthorized Access" });
//     }
//     let tokenOnly = token?.split(" ")?.[1];
//     let verifyToken = jwt.verify(tokenOnly, process.env.SECRET_KEY);
//     if (!verifyToken) {
//       res.status(400).json({ message: "User is not Authorized " });
//     }
//     req.id = verifyToken?.id;
//     next();
//   } catch (error) {
//     res.status(500).json({ message: "UnAuthorized Access" });
//     console.log(error);
//   }
// };

// module.exports = authMiddleWare;
