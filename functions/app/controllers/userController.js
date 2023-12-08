const express = require("express");
const nodemailer = require("nodemailer");
var fs = require('fs');
var path = require('path');

const mailOptions = {
  from: "zylensolutions@gmail.com",
  to: "it.zylensolutions@gmail.com",
  bcc: [
    "ganesh.durairaj@zylensolutions.com",
    "lenin.kasinathan@zylensolutions.com"
  ],
  cc: "hr@zylensolutions.com",
};

module.exports.createUser = async function (req, res) {
  res.send("You reached create route of user");
};

module.exports.sendMail = async function (userDetails) {
  return new Promise((resolve, reject) => {
    const { name, phonenumber, email, description } = userDetails;

    const transport = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "zylensolutions@gmail.com",
        pass: "tvex luty vmex mtmh",
      },
    });
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

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zylensolutions@gmail.com",
        pass: "tvex luty vmex mtmh",
      },
    });
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

// module.exports.contactus = async function (userDetails) {
//   return new Promise((resolve, reject) => {
//     const { name, phonenumber, email, description, attachments, budget } = userDetails;

//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "zylensolutions@gmail.com",
//         pass: "tvex luty vmex mtmh",
//       },
//     });
//     mailOptions.subject = "Applying for Job";
//     mailOptions.html = `
//     <p>Name: ${name}</p>
//     <p> Email Id: ${email}</p>
//     <p>Mobile Number: ${phonenumber}</p>
//     <p>Requirement Details: ${description}</p>
//     <p>Project Budget: ${budget}</p>
    
// `;
// mailOptions.attachments= [{
//     fileName: 'file.pdf', //This needs to be the link to the form, or the actual form
//     streamSource: fs.createReadStream(path.join(__dirname, 'file.pdf'))
//   }]

//     transport.sendMail(mailOptions, (err) => {
//       if (err) {
//         reject({ success: false, err });
//       } else {
//         resolve({ success: true, message: "MAIL SENT SUCCESSFULLY" });
//       }
//     });
//   });
// };


