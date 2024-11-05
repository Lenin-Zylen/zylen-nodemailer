var express = require("express");
var router = express();
const fs = require('fs');
const multer = require('multer');
var userController = require("../../controllers/userController");

router.post("/sendmail", async (req, res) => {
  const { name, phonenumber, email, description } = req.body;
  console.log(req.body, "<----/sendmail");
  
  const response = await userController.sendMail({
    name,
    phonenumber,
    email,
    description,
  });
  responseData(response, res);
});

router.post("/hire", async (req, res) => {
  const { name, phonenumber, email, description } = req.body;
  console.log(req.body, "<----/hire");
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

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, './files')
    cb(null, path.resolve(__dirname, './files'));
    // C:\Users\Ganesh Durai\Desktop\Zylen Projects\zylen-nodemailer\functions\files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }
});

const upload = multer({
  storage: fileStorageEngine
})

const emailMiddleware = async (req, res, next) => {
  try {
    const { name, email, description, phonenumber } = req.body;
    const { filename } = req.file;
    const extension = filename.split('.')[1];
    
    const response = await userController.contactUs({ name, phonenumber, email, description, filename, extension })
    if (response.success) {
      req.filename = filename;
      next();
    }
  } catch (error) {
    console.log(error, '<-== something went wrong');
  }
}

const removeFile = async (req, res, next) => {
  try {
    const { filename } = req;
    if (filename) {
      const filePath = `./files/${filename}`
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err)
        } else {
          next();
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
}

router.post('/contactus', upload.single('image'), emailMiddleware, removeFile, (req, res) => {
  try {
    res.status(200).json({ msg: 'File Saved Successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router;
