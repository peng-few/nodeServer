const express = require('express');
const employeeController = require('../../controllers/employeeController');

const router = express.Router();

router.route('/')
  .get(employeeController.getAllEmployees)
  .post(employeeController.createNewEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.get('/:id', employeeController.getEmployee);

module.exports = router;
