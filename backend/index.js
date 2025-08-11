const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY, authMiddleware} = require('./auth.middleware');
const Employee = require("./employee.model");
const Admin = require("./admin.model");
const initialData = require("./initialData.json")

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017", {
    dbName: 'employees-admin',
});
(async () => {
    if(await Admin.findOne({email: "admin@admin.com"}).countDocuments() === 0){
        await Admin.create({name: 'admin' , email: 'admin@admin.com', password: 'password'})
    }
    if(await Employee.countDocuments() === 0){
        initialData.forEach((employee) => {
            Employee.create({...employee});
        })
    }
})()

app.get("/api/employee", authMiddleware, async (req,res) => {
    const Employees = await Employee.find({});
    res.send(Employees);
});

app.delete("/api/employee/:id", authMiddleware, async (req,res) => {
    const id = req.params.id;
    const employee = await Employee.findByIdAndDelete(id);
    if(!employee) return res.status(404).send();
    res.status(204).send();
});

app.put("/api/employee/:id", authMiddleware, async (req,res) => {
    const id = req.params.id;
    if(!req.body) return res.status(400).send();
    const {name, email ,location ,flag ,department ,status ,balance} = req.body;
    const employee = await Employee.findOne({_id: id});
    if(!employee) return res.status(404).send();
    await Employee.updateOne({_id: id}, {$set: {name, email ,location ,flag ,department ,status ,balance}});
    res.status(200).send();
});

app.post("/api/employee", authMiddleware, async (req, res) => {
    if(!req.body) return res.status(400).send(req.body);
    const {name, email ,location ,flag ,department ,status ,balance} = req.body;
    try {
        await Employee.create({
            name, email ,location ,flag ,department ,status ,balance,
        });
    }catch (err){
        return res.status(400).send(err.errors);
    }
    res.status(201).send();
})


app.post('/api/login', async (req, res) => {
    if(!req.body) return res.status(400).send();
    const {email, password} = req.body;
    const admin = await Admin.findOne({email}); 
    if(admin?.countDocuments === 0 || admin?.password !== password){
        return res.status(404).json("Invalid Credentials!")
    }
    const token = jwt.sign({id: admin._id, email: admin.email, name: admin.name}, JWT_SECRET_KEY, {
        expiresIn: "5h",
    })
    return res.json({token, id: admin._id, email: admin.email, name: admin.name});
});

app.post('/api/register', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        await Admin.create({name, email, password});
        res.status(201).send();
    }catch (err){
        res.status(400).send(err.message);
    }
    
})

app.get('/api/dashboard', authMiddleware, (req, res) => {
    return res.status(200).send('Access aproved');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})