var mongoose = require('mongoose');
var DB = require('../DB');
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(DB.db);

var customerIDSchema = new mongoose.Schema({
  CustomerIDSequence: Number,
});

customerIDSchema.plugin(autoIncrement.plugin, {
  model: 'CustomerIDSequenceModel',
  field: 'CustomerIDSequence',
  startAt: 0,
  incrementBy: 1,
});

var CustomerIDeModel = mongoose.model('CustomerIDSequenceModel', customerIDSchema);

module.exports = CustomerIDeModel;
