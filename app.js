const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes =require('./routes/blogRoutes');
// express app
const app = express();

//connect to mongodb
const dbURI='mongodb+srv://mahesh:mahesh1234@cluster0.vazgqqb.mongodb.net/Node?retryWrites=true&w=majority';

mongoose.connect(dbURI,{useNewUrlParser: true,useUnifiedTopology: true})
 .then((result)=> app.listen(3000))
 .catch((err)=> console.log("error in connecting to database"));
// listen for requests



app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  res.render('about',{title : 'About'});
});

app.use('/blogs',blogRoutes);

app.use((req, res) => {
  res.status(404).render('404',{title: 'OOPS!'});
});
