const express = require('express');
const employeeController = require('../../controllers/employeeController');
const verifyRole = require('../../middleware/verifyRole');
const router = express.Router();

router.route('/')
  .get(verifyRole(['User','Admin','Editor']),employeeController.getAllEmployees)
  .post(verifyRole(['Admin','Editor']),employeeController.createNewEmployee)
  .put(verifyRole(['Admin','Editor']),employeeController.updateEmployee)
  .delete(verifyRole(['Admin']),employeeController.deleteEmployee);

router.get('/:id', employeeController.getEmployee);

module.exports = router;
