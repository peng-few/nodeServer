const express = require('express')
const router = express.Router();

const employees = require('../../data/employee.json');

router.route('/employee')
  .get((req,res) => {
    res.json(employees);
  })
  .post((req,res)=>{
    res.json({
      name: req.body.name,
      position: req.body.position
    })
  })
  .put((req,res)=>{
    res.json({
      name: req.body.name,
      position: req.body.position
    })
  })
  .delete((req,res)=>{
    res.json({
      id: req.body.id
    })
  })

router.get('/employee/:id',(req,res)=>{
  const id = req.params.id
  const employee = employees.find(employee=>employee.id==id);
  res.json(employee);
})


module.exports = router;