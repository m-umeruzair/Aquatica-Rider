const express = require("express");
const Rider = require("../models/rider")
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds= 10
const nodemailer = require("nodemailer");

router.post('/verification' ,async(req,res)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
          user: 'cs1912261@szabist.pk',
          pass: 'nwxoyqajszhklvzs', 
        },
      }); 
      var otp = Math.random();
      otp = otp * 1000000;
      otp = parseInt(otp);

      var to= await req.body.email


      var mailOptions = {
        to: to,
        subject: "OTP for rider account registration on Aquatica",
        html: "<h3>OTP for rider account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1> </n> <h3>Please do not share this otp with anyone"
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent!');
    });
    console.log(otp)
    res.status(200).send(JSON.stringify(otp))
})


router.post('/createRider', async(req,res)=>{

    var hashedPassword;
    // console.log(req.body.password)
    await bcrypt.genSalt(saltRounds).then(salt=>{
       return bcrypt.hash(req.body.riderPassword, salt)}).then(hash=>{
            hashedPassword = hash
           
        });
    const rider=new Rider({
        riderEmail:req.body.riderEmail,
        riderPassword:hashedPassword,
        riderNumber:req.body.riderNumber,
        riderNIC:req.body.riderId,
        riderName:req.body.riderName,
        riderVehicleName:req.body.riderVehicleName,
        riderVehicleNo:req.body.riderVehicleNo,
        riderEarning:0,
        riderTotalOrders:0
        
    })
    const save= await rider.save()
    res.status(200).send("Object created")
})

module.exports = router;