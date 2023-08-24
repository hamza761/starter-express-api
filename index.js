const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
// Dictionary to map IMEI numbers to device models (dummy data)
const imeiToDeviceModel = {
  '123456789': 'iPhone 11',
  '1234': 'Samsung Galaxy S10',
  // Add more entries here...
};

// Endpoint to get the device model from IMEI number
app.get('/imei/:imeiNumber', (req, res) => {
  const { imeiNumber } = req.params;
  const model = imeiToDeviceModel[imeiNumber];
setTimeout(() => {  
  if (model) {
    res.json({ model });
  } else {
    res.json({ model: 'Model not found for the provided IMEI number.' });
  }
}, 2000);
});

app.listen(process.env.PORT || 3000)