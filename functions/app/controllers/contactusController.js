// const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require('firebase/storage')

// const storage = getStorage();
const user = require("../controllers/userController");

const contactUsController = async (req, res, next) => {
    try {
    //   const dateTime = giveCurrentDateTime();

    //   const storageRef = ref(storage, `files/${req.file.originalname +"      "+ dateTime }`);

    //   const metaData = {
    //     contentType: req.file.mimetype
    //   }
    //   Upload the file in the bucket storage
    //   await uploadBytesResumable(storageRef, req.file.buffer, metaData)
      const { name, email, description, phonenumber } = req.body;
      const file = req.file;

      const userDetails = { name, email, description, phonenumber, filename: file.originalname, buffer: file.buffer }

    //   console.log(file)
      const data = await user.contactUs(userDetails)

      if (data.success) {
        res.status(200).json({ msg: 'File Saved Successfully' })
      } else {
        throw new Error(data.err)
      }

    } catch (error) {
      console.log(error, 'checking the error')
      res.status(400).json({ msg: error.message })
    }
}

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}  

module.exports = contactUsController;
