const db = require("../models/index");
const {  where, Op, Sequelize, Model } = require('sequelize');
const Joi = require("joi");

exports.newAppointment=async(req, res)=>{
    const {patientId, doctorId, date}= req.body;
    // TO DO VALIDATION
    try{
        const newAppointment= await db.Appointments.create({
            patientId:patientId, 
            doctorId:doctorId,
            appointmentDate:date, 
        });
        
        return res.status(201).json(newAppointment);
    }catch(err){
        return res.status(500).json({message:err.message}); 
    }
}
exports.appointmentsOfDoctor=async(req, res)=>{
     const {doctorId} = req.user.id; // id from doctor table
    // TO DO VALIDATION

     try{
        const doctor=await db.Doctors.findByPk(doctorId);
        if(!doctor){
            return res.status(401).json({message:'doctor not found'});
        }

        const appointments = await db.Appointments.findAll({
            where:{
                doctorId:doctor.id,
            },
            include:[{
                model:db.Users,
                attributes:['name'],
            }]
        });

        return res.status(200).json(appointments);
     }catch(err){
        return res.status(500).json({message:err.message});  
     }
}
