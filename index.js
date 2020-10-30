const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const error = require('./api/middleware/error');
const users = require('./api/routes/users');
const photos = require('./api/routes/photos');
const auth = require('./api/routes/auth');
const app = express();

if (!config.get('JWT_SECRET')) {
   console.error('FATAL ERROR: JWT_SECRET is not defined.');
   process.exit(1);
}

mongoose.connect(`mongodb://${config.get('dbconfig.host')}/${config.get('dbconfig.name')}`, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err))

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', users);
app.use('/api/photos', photos);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));