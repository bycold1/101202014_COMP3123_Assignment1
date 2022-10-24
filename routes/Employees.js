const express = require('express')
const app = express.Router()
const Employee = require('../model/EmployeeModelFile')


app.post('/emp/employees', async (req, res) => {
    const employee = new Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        salary: req.body.salary
    })

    try {
        const savedEmployee = await employee.save()
        res.status(201).send(savedEmployee)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


app.get("/emp/employees", async (req, res)=> {
    const employees= await Employee.find();
    if(employees.length > 0){
        res.status(200).json({
            message: "Employees found successfully",
            employees
        })
    }
    else{
        res.status(404).json({
            message: "Employees not found",
            employees
        })
    }
   
})

app.get('/emp/employees/:employeeID', async (req, res) => {
    try {
        const employee = await Employee.findById({_id: req.params.employeeID})
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/emp/employees/:employeeID', async (req, res) => {
    try {
        const employee = await Employee.updateOne({_id: req.params.employeeID}, {$set: req.body});
    
        res.status(200).json({
            message: `Employee with Id ${req.params.employeeID} updated successfully`,
            updatedEmployee: employee
        })
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/emp/employees/:employeeID', async (req, res) => {
    try {
        const employee = await Employee.remove({_id: req.params.employeeID})
     
   
        res.status(200).json({message: 'Deleted employee'})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = app