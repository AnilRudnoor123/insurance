const DataBase = require('./DB');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// var multer = require('multer');
var router = express.Router();
const useragent = require('express-useragent');
var fs = require('fs');
const customerDetails = require('./routers/customerdetails');
const config_ = require('./utils/config');
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(router);
const multer  = require('multer')
const upload = multer()
app.use(useragent.express());

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');

//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );

//   res.header('Access-Control-Allow-Headers', 'Content-Type');

//   res.header('Access-Control-Allow-Headers', 'Version');

//   next();
// });

const PORT = config_.port;
app.use('/api/insurance', customerDetails);

app.listen(PORT, (err, success) => {
  if (err) {
    console.log('Server Not Connected');
  } else {
    console.log('Server Listening on ' + PORT);
  }
});
