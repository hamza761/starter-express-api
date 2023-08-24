const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
function isValidIMEI(imei) {
    // Remove any non-numeric characters
    imei = imei.replace(/[^\d]/g, '');
  
    // Check if the IMEI is 15 digits long and contains only numeric characters
    if (/^\d{15}$/.test(imei) === false) {
      return false;
    }
  
    // Convert the IMEI string to an array of digits
    const imeiArray = imei.split('').map(Number);
  
    // Implement the Luhn algorithm to validate the IMEI
    let sum = 0;
    for (let i = 0; i < 14; i++) {
      let digit = imeiArray[i];
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
  
    // Calculate the check digit
    const checkDigit = (10 - (sum % 10)) % 10;
  
    // Compare the calculated check digit with the last digit of the IMEI
    return imeiArray[14] === checkDigit;
  }
  

  app.get('/', (req, res) => {
    res.send('ok')
  })

// Endpoint to get the device model from IMEI number
app.get('/imei/:imeiNumber', (req, res) => {
    const { imeiNumber } = req.params;
    if (isValidIMEI(imeiNumber)) {
      res.json({status: 'Valid IMEI'});
    } else {
        res.json({status: 'Invalid IMEI'});
    }
  });

app.listen(process.env.PORT || 3000)