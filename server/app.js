const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config()

// user routes
const userRoutes = require('./routes/user.route')


const app = express();
const PORT = process.env.PORT || 4500

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// user auth routes
app.use('/api', userRoutes)

// start server
app.listen(PORT, () => {
    console.log(`Express app listening on.........PORT :  ${PORT}`)
})