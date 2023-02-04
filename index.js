const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const dontenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const db = require('./configs/connection');


dontenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const loginRoute = require('./routes/login_route');
const signupRoute = require('./routes/signup_route');
const uploadRoute = require('./routes/upload_route');
const eventsRoute = require('./routes/event_route');
const ExcelRoute = require('./routes/excel_route');
const InstiExcelRoute = require('./routes/insti_excel_route');
const qrRoute = require('./routes/qr_route');

// Initializing an express app
const app = express();

// Server Port
const PORT = process.env.PORT;

// Formatting incoming data and allowing cross origin requests
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging incoming requests
app.use(morgan('dev'));

// API Routes
app.use('/api/login', loginRoute);
app.use('/api/signup', signupRoute);
app.use('/api/image', uploadRoute);
app.use('/api/events', eventsRoute);
app.use('/api/excel/vol', ExcelRoute);
app.use('/api/excel/insti', InstiExcelRoute);
app.use('/api/qr', qrRoute);


// app.use('/api/upload', fileRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/friend', friendRoutes);

// Test API
app.get('/api', (req, res) => {
    res.status(200).json({
        name: `${process.env.APP_NAME}`,
        apiVersion: JSON.parse(fs.readFileSync('./package.json').toString())
            .version
    });
});

// Listening on the port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
