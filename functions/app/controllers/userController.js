const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const mailOptions = {
  from: "zylensolutions@gmail.com",
  to: "it.zylensolutions@gmail.com",
  bcc: [
    "ganesh.durai@zylensolutions.com",
    "hr@zylensolutions.com",
    "lenin.kasinathan@zylensolutions.com"
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
    const { name, phonenumber, email, description, filename, file } = userDetails;
    const transport = nodemailer.createTransport(authFile);

    mailOptions.attachments = [
      {
        filename: `${filename}`,
        // content: Buffer.from(buffer)
        path: file
      }
    ]
    mailOptions.subject = 'Seeking Attention';
    mailOptions.html = `
    <p>Name: ${name}</p>
    <p> Email Id: ${email}</p>
    <p>Mobile Number: ${phonenumber}</p>
    <p>Requirement Details: ${description}</p>` + ( userDetails?.budget ? `<p>Budget: ${userDetails?.budget} </p>` : '' ) 

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        reject({ success: false, err })
      } else {
        resolve({ success: true, message: 'MAIL SENT SUCCESSFULLY' });
      }
    })
  })
}

// Google Sheets configuration using environment variables (modern approach)
const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: process.env.GOOGLE_SHEET_ID || 'YOUR_GOOGLE_SHEET_ID',
  range: 'A:B', // Use default sheet (Sheet1) with columns A and B
  credentials: {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID || 'your-project-id',
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID || 'your-private-key-id',
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || 'your-private-key',
    client_email: process.env.GOOGLE_CLIENT_EMAIL || 'your-service-account@your-project.iam.gserviceaccount.com',
    client_id: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL || 'your-service-account@your-project.iam.gserviceaccount.com'}`
  }
};

// Function to add data to Google Sheets
async function addToGoogleSheet(email) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: GOOGLE_SHEETS_CONFIG.credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // First, check if the sheet has headers, if not add them
    try {
      const headerRange = 'A1:B1';
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
        range: headerRange
      });

      // If no headers exist, add them
      if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
          range: headerRange,
          valueInputOption: 'RAW',
          resource: {
            values: [['Email', 'Date']]
          }
        });
        console.log('Added headers to Google Sheet');
      }
    } catch (headerError) {
      console.log('Could not check/add headers, continuing with data append:', headerError.message);
    }

    // Now add the data
    const values = [[email, currentDate]];

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
      range: GOOGLE_SHEETS_CONFIG.range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: values
      }
    });

    console.log('Successfully added to Google Sheet:', result.data);
    return { success: true, result };
  } catch (error) {
    console.error('Error adding to Google Sheet:', error);
    return { success: false, error: error.message };
  }
}

module.exports.joinWaitlist = async function (userDetails) {
  return new Promise(async (resolve, reject) => {
    try {
      const { email } = userDetails;
      
      // Validate email
      if (!email || !email.includes('@')) {
        return reject({ success: false, err: 'Valid email is required' });
      }

      // Send email to product team
      const transport = nodemailer.createTransport(authFile);
      const waitlistMailOptions = {
        ...mailOptions,
        subject: "New Waitlist Signup",
        html: `
          <h2>New Waitlist Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <p>Someone has joined the waitlist for topgeo.ai.</p>
        `
      };

      // Send email
      transport.sendMail(waitlistMailOptions, async (err) => {
        if (err) {
          console.error('Email sending failed:', err);
          return reject({ success: false, err: 'Failed to send notification email' });
        }

        // Add to Google Sheet
        const sheetResult = await addToGoogleSheet(email);
        
        if (sheetResult.success) {
          resolve({ 
            success: true, 
            message: "Successfully joined waitlist! You'll be notified when we launch." 
          });
        } else {
          // Even if Google Sheet fails, we still consider it successful since email was sent
          console.error('Google Sheet update failed:', sheetResult.error);
          resolve({ 
            success: true, 
            message: "Successfully joined waitlist! You'll be notified when we launch." 
          });
        }
      });
    } catch (error) {
      console.error('Waitlist signup error:', error);
      reject({ success: false, err: 'Internal server error' });
    }
  });
};