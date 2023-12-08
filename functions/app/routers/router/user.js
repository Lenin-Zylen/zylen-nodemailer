var express = require("express");
var router = express();
var userController = require("../../controllers/userController");

//post method
//this fn user for create user
//http://localhost:4000/api/user/create
// router.post("/create", userController.createUser);

// router.post("/sendmail", userController.sendMail)

router.post("/sendmail", async (req, res) => {
  const { name, phonenumber, email, description } = req.body;
  const response = await userController.sendMail({
    name,
    phonenumber,
    email,
    description,
  });
  responseData(response);
});

router.post("/hire", async (req, res) => {
  const { name, phonenumber, email, description } = req.body;
  const response = await userController.hire({
    name,
    phonenumber,
    email,
    description,
  });
  responseData(response, res);
});

const responseData = async function (response, res) {
  if (response.success) {
    return res.status(200).json({
      message: response.message,
    });
  } else {
    return res.status(400).json({ error: response.err });
  }
};

module.exports = router;
