const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require('redis');
const faqRouter = require('./routes/faq'); 
const adminRouter = require('./admin'); 
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


mongoose.connect('mongodb+srv://Tirumala:Tirumala02@cluster0.lnx32.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));


const redisClient = redis.createClient({
    host: 'http://13.60.2.49', 
    port: 6379 
});

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
});

redisClient.connect();


app.use('/', faqRouter(redisClient));
app.use('/admin', adminRouter); 


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = server;