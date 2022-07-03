const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
  res.json(await Employee.find({}).exec());
};

const createNewEmployee = async (req, res) => {
  const newEmployee = {
    name: req.body.name,
    position: req.body.position,
  };

  if (!newEmployee.name || !newEmployee.position) {
    res.status(400).json(['請填寫完整的名稱與職位']);
    return;
  }

  try {
    const resultEmployee = await Employee.create(newEmployee)
    res.status(201).json(resultEmployee);
  } catch (error) {
    res.status(400).json([error]);
  }
};

const updateEmployee = (req, res) => {
  const newEmployee = {
    name: req.body.name,
    position: req.body.position,
  };
  if (!newEmployee.name || !newEmployee.position) {
    res.status(400).json(['請填寫完整的名稱與職位']);
    return;
  }

  const {id} = req.body;
  Employee.findByIdAndUpdate(id,newEmployee,{returnDocument: 'after'},(error,doc) => {
    if(error) return res.status(400).json(error);
    if(!doc) return res.status(400).json(['查無此人員']);
    res.status(201).json(doc);
  })

};

const deleteEmployee = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json(['請輸入Id']);
    return;
  }

  Employee.findByIdAndDelete(id,(error,doc) => {
    if(error) res.status(400).json(error);
    if(!doc) res.status(400).json(['查無此人員']);
    res.status(201).json(['刪除成功']);
  })

};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  const foundEmployee = await Employee.findById(id).exec();
  res.json(foundEmployee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
