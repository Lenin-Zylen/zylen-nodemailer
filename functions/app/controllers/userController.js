const nodemailer = require("nodemailer");

const mailOptions = {
  from: "zylensolutions@gmail.com",
  to: "it.zylensolutions@gmail.com",
  bcc: [
    "ganesh.durai@zylensolutions.com",
    "hr@zylensolutions.com",
    "aparna.kv@zylensolutions.com"
  ],
  cc: "sales@zylensolutions.com",
};

const authFile = {
  service: "gmail",
  secure: true,
  auth: {
    user: "zylensolutions@gmail.com",
    pass: "tvex luty vmex mtmh",
  },
}

module.exports.createUser = async function (req, res) {
  res.send("You reached create route of user");
};

module.exports.sendMail = async function (userDetails) {
  return new Promise((resolve, reject) => {
    const { name, phonenumber, email, description } = userDetails;

    const transport = nodemailer.createTransport(authFile);
    mailOptions.subject = "Enquiry for Business";
    mailOptions.html = `
    <p>Name: ${name}</p>
    <p> Email Id: ${email}</p>
    <p>Mobile Number: ${phonenumber}</p>
    <p>Requirement Details: ${description}</p>
    
`;

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        reject({ success: false, err });
      } else {
        resolve({ success: true, message: "MAIL SENT SUCCESSFULLY" });
      }
    });
  });
};

module.exports.hire = async function (userDetails) {
  return new Promise((resolve, reject) => {
    const { name, phonenumber, email, description } = userDetails;

    const transport = nodemailer.createTransport(authFile);
    mailOptions.subject = "Applying for Job";
    mailOptions.html = `
    <p>Name: ${name}</p>
    <p> Email Id: ${email}</p>
    <p>Mobile Number: ${phonenumber}</p>
    <p>Requirement Details: ${description}</p>
    
`;

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        reject({ success: false, err });
      } else {
        resolve({ success: true, message: "MAIL SENT SUCCESSFULLY" });
      }
    });
  });
};

module.exports.contactUs = (userDetails) => {
  return new Promise((resolve, reject) => {
    const { name, phonenumber, email, description, filename, extension } = userDetails;

    const transport = nodemailer.createTransport(authFile);

    mailOptions.attachments = [
      {
        filename: `image.${extension}`,
        path: `./files/${filename}`
      }
    ]
    mailOptions.subject = 'Seeking Attention';
    mailOptions.html = `
    <p>Name: ${name}</p>
    <p> Email Id: ${email}</p>
    <p>Mobile Number: ${phonenumber}</p>
    <p>Requirement Details: ${description}</p>`;

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        reject({ success: false, err })
      } else {
        resolve({ success: true, message: 'MAIL SENT SUCCESSFULLY' });
      }
    })
  })
}