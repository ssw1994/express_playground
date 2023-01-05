const { userModal } = require("../schemas/user.schema");

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
};
