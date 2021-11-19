const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const registerRouter = require('./routes/register');
app.use('/register',registerRouter);
const loginRouter = require('./routes/login');
app.use('/login',loginRouter);
const complaintRouter = require('./routes/complaint');
app.use('/complaint',complaintRouter);
const updateRouter = require('./routes/update');
app.use('/update',updateRouter);
const changePasswordRouter = require('./routes/changePassword');
app.use('/changePassword',changePasswordRouter);
const viewMenuRouter = require('./routes/viewMenu');
app.use('/viewMenu',viewMenuRouter);
const takeFoodRouter = require('./routes/takeFood');
app.use('/takeFood',takeFoodRouter);
const getBillsRouter = require('./routes/bills');
app.use('/bills',getBillsRouter);
const resolveComplaintsRouter = require('./routes/resolveComplaints');
app.use('/resolveComplaints',resolveComplaintsRouter);
const giveFoodRouter = require('./routes/giveFood');
app.use('/giveFood',giveFoodRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});