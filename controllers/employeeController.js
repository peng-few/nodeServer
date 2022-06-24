const fs = require('fs');
const path = require('path');
const DB = require('../model/employee.json');

const data = {
  employees: DB,
  setEmployees(employees) {
    fs.writeFile(
      path.join(__dirname, '..', 'model', 'employee.json'),
      JSON.stringify(employees),
      (err) => {
        if (err) {
          console.log(err);
        }
      },
    );
    this.employees = employees;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    name: req.body.name,
    position: req.body.position,
  };

  if (!newEmployee.name || !newEmployee.position) {
    res.status(400).json(['請填寫完整的名稱與職位']);
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const newEmployee = {
    id: req.body.id,
    name: req.body.name,
    position: req.body.position,
  };
  if (!newEmployee.id || !newEmployee.name || !newEmployee.position) {
    res.status(400).json(['請填寫完整的名稱與職位']);
    return;
  }

  const findEmployee = data.employees.find(
    (employee) => employee.id === parseInt(newEmployee.id, 10),
  );
  if (!findEmployee) {
    res.status(400).json(['查無該職員']);
    return;
  }
  findEmployee.name = newEmployee.name;
  findEmployee.position = newEmployee.position;

  data.setEmployees(data.employees);

  res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).write('請填入id');
    return;
  }
  const remainEmployees = data.employees.filter(
    (employee) => employee.id !== parseInt(id, 10),
  );
  data.setEmployees(remainEmployees);
  res.status(201).json(data.employees);
};

const getEmployee = (req, res) => {
  const { id } = req.params;
  const findEmployee = data.employees.find(
    (employee) => employee.id === parseInt(id, 10),
  );
  res.json(findEmployee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
