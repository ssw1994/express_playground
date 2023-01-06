const { userModal } = require("../schemas/user.schema");
const jwt = require("jsonwebtoken");
async function registerUser(req, res, next) {
  const user = new userModal(req.body);
  try {
    const userEntity = await user.save();
    res
      .send({
        data: userEntity,
      })
      .json()
      .status(201);
  } catch (error) {
    if (error.code === 11000) {
      const values = Object.keys(error.keyValue).join(",");
      res.send({ message: `${values} already exists` });
    }
    res
      .send({
        message: error.message,
      })
      .json()
      .status(401);
  }
}

async function authenticate(req, res, next) {
  const { email, password } = req.body;
  const users = await userModal.find({ email: email });
  if (users.length > 0) {
    const user = await userModal.find({ email: email, password: password });
    if (user.length > 0) {
      const data = {
        email: user[0].email,
      };
      const jwtKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(data, jwtKey);
      res
        .send({
          accessToken: token,
        })
        .json()
        .status(200);
    } else {
      res
        .send({
          message: "invalid password",
        })
        .json()
        .status(400);
    }
  } else {
    res
      .send({
        message: "invalid credentials",
      })
      .json()
      .status(400);
  }
}

async function getAllUsers(req, res, next) {
  const allUsers = await userModal.find();
  res
    .send({
      data: allUsers,
    })
    .json()
    .status(200);
}

module.exports = {
  registerUser,
  getAllUsers,
  authenticate,
};
