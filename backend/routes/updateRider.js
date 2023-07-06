const express = require("express");
const Rider = require("../models/rider")
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds= 10
const nodemailer = require("nodemailer");

router.post('/updateRider' ,async(req,res)=>{
    var rider
    
      if(req.body.riderName==null && req.body.riderEmail==null && req.body.riderPassword==null && req.body.riderNumber==null && 
        req.body.riderNIC==null && req.body.riderVehicleName==null && req.body.riderVehicleNo==null && req.body.riderEarning==null && req.body.riderTotalOrders==null){
        res.status(400).send()
      }
      else{
      if (req.body.riderEmail!=null){
        var riderEmail=req.body.riderEmail;
        var Id= req.body.Id
      
          await Rider.findOneAndUpdate({_id:Id},{$set:{riderEmail:riderEmail}})
          rider = await Rider.find({_id:Id})

      }

      if(req.body.riderPassword!=null){
        var hashedPassword;
        // console.log(req.body.password)
        await bcrypt.genSalt(saltRounds).then(salt=>{
           return bcrypt.hash(req.body.riderPassword, salt)}).then(hash=>{
                hashedPassword = hash
               
            });
        var Id= req.body.Id   
         await Rider.findOneAndUpdate({_id:Id},{$set:{riderPassword:hashedPassword}})
         rider = await Rider.find({_id:Id})
      }

      if (req.body.riderName!=null){
        var Id= req.body.Id   
         await Rider.findOneAndUpdate({_id:Id},{$set:{riderName:req.body.riderName}})
         rider = await Rider.findOne({_id:Id})
        
      }

      if(req.body.riderNumber!=null){
        var Id= req.body.Id
        await Rider.findOneAndUpdate({_id:Id},{$set:{riderNumber:req.body.riderNumber}})
        rider = await Rider.findOne({_id:Id})
      }

      if(req.body.riderVehicleName!=null){
        var Id= req.body.Id   
        await Rider.findOneAndUpdate({_id:Id},{$set:{riderVehicleName:req.body.riderVehicleName}})
        rider = await Rider.find({_id:Id})
      }
      if(req.body.riderVehicleNo!=null){
        var Id= req.body.Id   
        await Rider.findOneAndUpdate({_id:Id},{$set:{riderVehicleNo:req.body.riderVehicleNo}})
        rider = await Rider.find({_id:Id})
      }
      if(req.body.riderNIC!=null){
        var Id= req.body.Id   
        await Rider.findOneAndUpdate({_id:Id},{$set:{riderNIC:req.body.riderNIC}})
        rider = await Rider.find({_id:Id})

      }
      if(req.body.riderEarning!=null){
        var Id= req.body.Id
        rider = await Rider.find({_id:Id})
        console.log(Id)
        rider[0].riderEarning=rider[0].riderEarning+req.body.riderEarning
        
        await Rider.findOneAndUpdate({_id:Id},{$set:{riderEarning:rider[0].riderEarning}})
        rider = await Rider.find({_id:Id})
      }
      if(req.body.riderTotalOrders!=null){
        var Id= req.body.Id
        rider = await Rider.find({_id:Id})
        rider[0].riderTotalOrders=rider[0].riderTotalOrders+req.body.riderTotalOrders
        await Rider.findOneAndUpdate({_id:Id},{$set:{riderTotalOrders:rider[0].riderTotalOrders}})
        rider = await Rider.find({_id:Id})
      }

     // console.log(rider)
       res.status(200).json({rider:rider})
    
    }
})



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

      var to= await req.body.riderEmail


      var mailOptions = {
        to: to,
        subject: "OTP for account registration on Aquatica",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1> </n> <h3>Please do not share this otp with anyone"
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


module.exports = router;