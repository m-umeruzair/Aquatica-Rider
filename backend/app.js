const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const login= require('./routes/login')
const createRider= require('./routes/createRider')
const updateRider= require('./routes/updateRider')
const readOrder= require('./routes/readOrder')
const finduser= require('./routes/findUser')
const completeOrder= require('./routes/completeOrder')
const findrider= require('./routes/findRider')
const updateCompany= require('./routes/companyUpdate')


dotenv.config();
const app = express();

app.use(express.json())
const corsOptions = {
    exposedHeaders: "x-auth-token",
  };
  
app.use(cors());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

const DB_CONNECTION_STRING= `mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@cluster0.4rplm.mongodb.net/Aquatica`

app.use(login)
app.use(createRider)
app.use(updateRider)
app.use(readOrder)
app.use(finduser)
app.use(completeOrder)
app.use(findrider)
app.use(updateCompany)

app.listen(process.env.PORT, (error) => {
  
    if (error) {
      console.error("Error Occurred while connecting to server: ", error);
    } else {
      console.log("Connected to Server Successfully!");
  
      console.log("Trying to connect to database server...");
  
      mongoose.connect(DB_CONNECTION_STRING, (dbError) => {
        if (dbError) {
          console.error("Error Occurred while connecting to database: ", dbError);
        } else {
          console.log("Connected to Database Successfully!");
        }
      });
    }
  });