const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const cors = require('cors');

// const albums = require('./Albums');

const app = express();
app.use(cors())

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routing
app.use('/api/albums', require('./routes/api/Albums'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
