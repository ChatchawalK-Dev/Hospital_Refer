const express = require('express');

const app = express();
const postRoutes = require('./routes/Post');
const loginUsers = require('./routes/login')
const register = require('./routes/register')
const province = require('./routes/address/province')
const medicalRecords = require('./routes/medicalRecords')
const searchReferIn = require('./routes/searchReferIn')
const searchReferOut = require('./routes/searchReferOut')
const referOut = require('./routes/referOut')
const Dashboard = require('./routes/Dashboard')
const referIn = require('./routes/referIn')
const referInn = require('./routes/referInn')
const referOutPopup = require('./routes/referOutPopup')
const getdetailInformation = require('./routes/getdetailInformation')
const updateDetailInfomation = require('./routes/updateDetailInfomation')
const notification = require('./routes/notification')



//test Only
const test = require('./routes/test')
const cors = require('cors');

const TIMEOUT_DURATION = 30000;

// Middleware to set timeout
app.use((req, res, next) => {
    res.setTimeout(TIMEOUT_DURATION, () => {
      console.log('Request has timed out.');
      res.status(408).send('Request Timeout');
    });
    next();
});

app.use(cors()); // เปิดใช้งาน CORS
app.use(express.json());
app.use('/post', postRoutes); // ใช้งานเส้นทางที่กำหนดใน Post.js ใน root path
app.use('/login', loginUsers); 
app.use('/register', register);
app.use('/province', province);
app.use('/medicalRecords', medicalRecords);
app.use('/searchReferIn', searchReferIn);
app.use('/referOut', referOut);
app.use('/searchReferOut', searchReferOut);
app.use('/dashboard',Dashboard);
app.use('/referIn',referIn);
app.use('/referOutPopup',referOutPopup);
app.use('/getdetailInformation',getdetailInformation);
app.use('/updateDetailInfomation',updateDetailInfomation);
app.use('/notification',notification)
app.use('/referInn',referInn)



app.use('/test',test);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
