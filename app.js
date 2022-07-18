const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
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

app.get('/blogs', (req, res) => {
  // res.send('<p>home page</p>');
  Blog.find().sort({createdAt: -1})
  .then((result)=>{
    res.render('index',{title : 'Welcome to Blog Guru',blogs:result});
  })
  .catch((err)=>{
    console.log(err);
  })
});

app.post('/blogs',(req,res)=>{
  const blog=new Blog(req.body);
  blog.save()
  .then((result)=>{
    res.redirect('/blogs');
  })
  .catch((err)=>{
    console.log(err);
  })
});

app.get('/blogs/create', (req, res) => {
  // res.send('<p>about page</p>');
  res.render('create',{title : 'New Blog'});
});

app.get('/blogs/:id',(req,res)=>{
  const id=req.params.id;
  Blog.findById(id)
   .then((result)=>{
    res.render('details',{title: result.title,blog: result});
   })
   .catch((err)=>{
    console.log(err);
   })
});

app.delete('/blogs/:id',(req,res)=>{
  const id=req.params.id;
  Blog.findByIdAndDelete(id)
  .then((result)=>{
    res.json({redirect: '/blogs'});
  })
  .catch((err)=>{
    console.log(err);
  });
});
// 404 page
app.use((req, res) => {
  res.status(404).render('404',{title: 'OOPS!'});
});
