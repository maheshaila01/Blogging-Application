const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

app.set('view engine','ejs');

app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index',{title : 'Welcome to Blogging Appication',blogs});
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  res.render('about',{title : 'About'});
});

app.get('/blogs/create', (req, res) => {
  // res.send('<p>about page</p>');
  res.render('create',{title : 'New Blog'});
});
// 404 page
app.use((req, res) => {
  res.status(404).render('404',{title: 'OOPS!'});
});
