const db = require("../models/index");
const {  where, Op, Sequelize, Model } = require('sequelize');
const Joi = require("joi");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registerPatient=async(req, res)=>{
    const {fullname, password, email, role, specialization}=req.body;
    
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.required': 'name is required.'
        }),
        password: Joi.string().min(4).required().messages({
            'string.required': 'password is required.',
            'string.min':'password should have minimum 4 characters.'
        }),
        email: Joi.string().email().required().messages({
            'email.required': 'email is required.',
            'email.email': 'must be valid email.',
        }),
        role:Joi.string().valid(['doctor', 'patient']).required().messages({
            'string.base': 'role is required.',
            'sring.valid': 'role should be valid value.',
        }),
    });
    const { error, value } = schema.validate({
        name:fullname,
        password:password,
        email:email, 
        role:role,
    });
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    try{
        
        const newUser = await db.Users.create({
            name:fullname,
            password:await bcrypt.hash(password, 10),
            email:email,
            role:role,
        });

        const newPatient = await db.Patients.create({
            userId:newUser.id,
        });

        return res.status(200).json(newUser, newPatient);

    }catch(err){
        return res.status(500).json({message:err.message});
    }
}
exports.registerDoctor=async(re, res)=>{
    const {fullname, password, email, role, specialization}=req.body;
    
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.required': 'name is required.'
        }),
        password: Joi.string().min(4).required().messages({
            'string.required': 'password is required.',
            'string.min':'password should have minimum 4 characters.'
        }),
        email: Joi.string().email().required().messages({
            'email.required': 'email is required.',
            'email.email': 'must be valid email.',
        }),
        role:Joi.string().valid(['doctor', 'patient']).required().messages({
            'string.base': 'role is required.',
            'sring.valid': 'role should be valid value.',
        }),
        specialization:Joi.string().valid(['Dermatology','Endocrinologist','Oncologist','Family Medicine','Neurology']).messages({
            'string.required': 'specialization is required.',
            'sring.valid': 'specialization should be valid value.',
        }),
    });
    const { error, value } = schema.validate({
        name:fullname,
        password:password,
        email:email, 
        role:role,
        specialization:specialization,
    });
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    try{
        const newUser = await db.Users.create({
            name:fullname,
            password:await bcrypt.hash(password, 10),
            email:email,
            role:role,
        });

        const newDoctor = await db.Doctors.create({
            userId:newUser.id,
            specialization:specialization,
        });

        return res.status(200).json(newUser, newDoctor);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}
exports.patients=async(req, res)=>{
    
    try{
        const patient = await db.Patients.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include:[{
                model:db.Users,
                attributes:['name'],
            }]
        });

        
        return res.status(200).json(patient);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}
exports.login=async(req, res)=>{
    const {email , password}=req.body;
    // To To VALIDATION
    try{
        const user = await db.Users.findOne({ where: { email:email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        if(!(await bcrypt.compare(password, user.password))){
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id }, 'lotus_secret');
        // Store token in the database
        await db.UserTokens.create({token:token, userId:user.id});
        res.status(200).json({token: token , role:user.role});

    }catch(err){
        return res.status(500).json({message:err.message});
    }
}
exports.logout= async(req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    try{
    await userToken.destroy({where:{token:token}});
    res.status(200).json({ message: 'Logged out successfully' });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};