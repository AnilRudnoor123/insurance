var _constants = require('../utils/constants');
var customerDetailsmodel = require('../models/customerdetails');
var customerSequence = require('../sequence/queries/insurancecustomerqueries');
const multer = require('multer');
const express = require('express');
const xltojson = require('convert-excel-to-json');
const app = express();
const XLSX = require('xlsx');
const path = require('path');
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Kolkata');



exports.createCustomerDetails = (req, res) => {
  console.log('stage1');
  console.log(req.files.file.originalFilename);
  var filepath = req.files.file.originalFilename;
  const exeldata = xltojson({
    sourceFile: filepath,
    rows: {
      rows: 2,
    },
    columnToKey: {
      '*': '{{columnHeader}}',
    },
  });
  console.log('exeldata', exeldata);
  return;

  // Replace 'your_file.xlsx' with the path to your actual XLSX file
  console.log(req.files.file.originalFilename);
  const insurance = req.files.file.originalFilename;
  const workbook = XLSX.readFile('insurance');
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  // You can specify the sheet name or use the default (the first sheet in the workbook)

  // Convert the worksheet data to JSON format
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  // Output the data to the console
  console.log('11', jsonData);

  // console.log(req.files)
  customerSequence.generatedementiastagesSequence(function (error, sequence) {
    var dateofbirth = moment(req.body.DateOfBirth, 'DD-MM-YYYY').unix();
    var interactionDate = moment(req.body.InteractionDate, 'DD-MM-YYYY').unix();
    console.log('dateofbirth', dateofbirth);
    if (req.body == null || req.body == undefined) {
      res.status(_constants.serverResponseCodes.Invalid_Parameters).json({
        type: false,
        data: 'Enter Parameters',
      });
    } else {
      let customerObj = {};
      customerObj.Comments = [];
      customerObj.PolicyInformation = [];
      customerObj.Address = [];
      customerObj['CustomerName'] = req.body.CustomerName;
      customerObj['CustomerID'] = sequence;
      customerObj['MobileNumber'] = req.body.MobileNumber;
      customerObj['EmailID'] = req.body.EmailID;
      customerObj['InteractionDate'] = interactionDate;

      var dateofbirth = moment(req.body.DateOfBirth, 'DD-MM-YYYY').unix();
      customerObj['DateOfBirth'] = dateofbirth;
      customerObj['Status'] = req.body.Status;
      //policy info
      let policyinfo = {};
      policyinfo['ProviderName'] = req.body.ProviderName;
      policyinfo['ProviderStatus'] = req.body.ProviderStatus;
      policyinfo['Type'] = req.body.Type;
      policyinfo['GSTNumber'] = req.body.GSTNumber;
      policyinfo['Commission'] = req.body.Commission;

      //address info
      let customerAddress = {};
      customerAddress['StreetAddress'] = req.body.StreetAddress;
      customerAddress['City'] = req.body.City;
      customerAddress['State'] = req.body.State;
      customerAddress['ZIPCode'] = req.body.ZIPCode;
      customerAddress['Country'] = req.body.Country;
      customerObj.PolicyInformation.push(policyinfo);
      customerObj.Comments.push(req.body.Comments);
      customerObj.Address.push(customerAddress);

      customerDetailsmodel
        .create(customerObj)
        .then((response) => {
          res.status(_constants.serverResponseCodes.Invalid_Parameters).json({
            type: true,
            data: response,
            msg: 'data Added Successfully',
          });
          return;
        })
        .catch((e) => {
          res.status(_constants.serverResponseCodes.Error).json({
            type: false,
            data: e,
          });
          return;
        });
    }
  });
};

exports.viewAllCustomers = (req, res) => {
  customerDetailsmodel
    .aggregate([{ $match: {} }])
    .then((response) => {
      console.log('response', response.length);
      if (response.length >= 1) {
        res.status(_constants.serverResponseCodes.Success).json({
          type: true,
          msg: 'Data Fetch Successfully',
          data: response,
        });
      }
      if (response.length < 1) {
        res.status(_constants.serverResponseCodes.NoData).json({
          type: true,
          msg: 'No Data',
        });
      }
    })
    .catch((e) => {
      res.status(_constants.serverResponseCodes.Error).json({
        type: false,
        data: e,
      });
      return;
    });
};

exports.assignEmployeeToCustomer = (req, res) => {
  let customerID = req.body.CustomerID;
  customerDetailsmodel
    .aggregate([{ $match: { CustomerID: customerID } }])
    .then((response) => {
      if (response.length >= 1) {
        let customerObj = {};
        customerObj.EmployeeDetails = [];
        employeeDetailsObj = {};
        employeeDetailsObj['EmployeeID'] = req.body.EmployeeID;
        employeeDetailsObj['EmployeeName'] = req.body.EmployeeName;
        customerObj.EmployeeDetails.push(employeeDetailsObj);
        customerDetailsmodel
          .update({ CustomerID: customerID }, { $set: customerObj })
          .then((response) => {
            res.status(_constants.serverResponseCodes.Success).json({
              type: true,
              msg: 'Data Updated Succcessfully',
              data: response,
            });
          })
          .catch(() => {
            res.status(_constants.serverResponseCodes.Success).json({
              type: true,
              data: e,
            });
          });
      } else {
        res.status(_constants.serverResponseCodes.NoData).json({
          type: false,
          msg: 'No Data Found',
        });
      }

      console.log('response', response);
    })
    .catch((error) => {});
  return;
};
