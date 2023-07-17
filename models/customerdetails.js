var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Kolkata');

let PolicyScheema = new mongoose.Schema({
  ProviderName: { type: Schema.Types.String, default: '' },
  ProviderStatus: { type: Schema.Types.String, default: 'Active' },
  Type: { type: Schema.Types.String, default: '' },
  GSTNumber: { type: Schema.Types.String, default: '' },
  Commission: { type: Schema.Types.Number, default: '' },
});
let AddressSchema = new mongoose.Schema({
  StreetAddress: { type: Schema.Types.String, default: '' },
  City: { type: Schema.Types.String, default: '' },
  State: { type: Schema.Types.String, default: '' },
  ZIPCode: { type: Schema.Types.Number, default: '' },
  Country: { type: Schema.Types.String, default: '' },
});
let EmployeeDetailsScheema = new mongoose.Schema({
  EmployeeID: { type: Schema.Types.String, default: '' },
  EmployeeName: { type: Schema.Types.String, default: '' },
});
let customerDetails = new mongoose.Schema({
  CustomerID: { type: Schema.Types.String, default: '' },
  CustomerName: { type: Schema.Types.String, default: '' },
  MobileNumber: { type: Schema.Types.Number, default: '' },
  EmailID: { type: Schema.Types.String, default: '' },
  DateOfBirth: { type: Schema.Types.Number, default: '' },
  Comments: [''],
  Status: { type: Schema.Types.String, default: 'Open' },
  InteractionDate:{ type: Schema.Types.Number, default: '' },
  Address: [AddressSchema],
  PolicyInformation: [PolicyScheema],
  EmployeeDetails: [EmployeeDetailsScheema],
});
var insuranceCustomerDetails = mongoose.model(
  'customerDetails',
  customerDetails
);
module.exports = insuranceCustomerDetails;
