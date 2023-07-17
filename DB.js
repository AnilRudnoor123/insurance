const mongoose = require('mongoose');
const config_ = require('./utils/config');

let mongoURL;

if (config_.ENV == 'Dev') {
  mongoURL = 'mongodb://localhost:27017/InsuranceDev';
} else if (config_.ENV == 'Test') {
} else if (config_.ENV == 'Live') {
}

mongoose
  .connect(mongoURL, {})
  .then(() => {
    console.log('Data Base connected');
  })
  .catch((e) => {
    console.log(e);
    console.log('DB not connected');
  });
  var db = mongoose.connection;
exports.db = db;
