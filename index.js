const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const photos = require('./routes/photos');
const auth = require('./routes/auth');
const app = express();

if (!config.get('jwtPrivateKey')) {
   console.error('FATAL ERROR: jwtPrivateKey is not defined.');
   process.exit(1);
}

mongoose.connect('mongodb://localhost/memos', {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json());
app.use('/api/users', users);
app.use('/api/photos', photos);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
