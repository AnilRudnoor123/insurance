var express = require('express');
var router = express.Router();
var CustomerDetails_controller = require('../controllers/customerdetails');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var express = require('express');
var router = express.Router();

const multer = require('multer');
const upload = multer();

router.use(function (req, res, next) {
  console.log('Request insurance Router');
  next();
});

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
router.use(function (req, res, next) {
  console.log('Request customer details  Router');
  next();
});

router.post(
  '/addcustomer',
  multipartMiddleware,
  CustomerDetails_controller.createCustomerDetails
);
router.get(
  '/Viewallcustomersdetails',
  multipartMiddleware,
  CustomerDetails_controller.viewAllCustomers
);
router.put(
  '/AssignEmployee',
  CustomerDetails_controller.assignEmployeeToCustomer
);
module.exports = router;
