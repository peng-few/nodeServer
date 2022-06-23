const fs = require("fs");
const path = require("path");

const data = {
    employees: require("../model/employee.json"),
    setEmployees(employees) {
        fs.writeFile(
            path.join(__dirname, "..", "model", "employee.json"),
            JSON.stringify(employees),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
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
        res.status(400).json(["請填寫完整的名稱與職位"]);
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
        return res.status(400).json(["請填寫完整的名稱與職位"]);
    }

    const employee = data.employees.find(
        (employee) => employee.id === parseInt(newEmployee.id)
    );
    if (!employee) {
        return res.status(400).json(["查無該職員"]);
    }
    employee.name = newEmployee.name;
    employee.position = newEmployee.position;

    data.setEmployees(data.employees);

    res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).write("請填入id");
    }
    const remainEmployees = data.employees.filter(
        (employee) => employee.id !== parseInt(id)
    );
    data.setEmployees(remainEmployees);
    res.status(201).json(data.employees);
};

const getEmployee = (req, res) => {
    const id = req.params.id;
    const employee = data.employees.find(
        (employee) => employee.id === parseInt(id)
    );
    res.json(employee);
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
};