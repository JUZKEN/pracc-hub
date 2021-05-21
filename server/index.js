require('express-async-errors');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const app = express();

require('./logging')();
require('./config')();

// Connect to database
const database = config.get('MONGODB_URI');
mongoose.connect(database, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false
}).then(() => winston.info('Connected to MongoDB...'));

// Routes
require('./routes')(app);

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, '../client/build')));
   app.get('/', function(req, res) {
       res.sendFile(path.join(__dirname, 'build', 'index.html'));
   });
}

const port = process.env.PORT || 5000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));