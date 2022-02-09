const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();
const { Pool } = require('pg');
var pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/database', (req,res) => {
  var getUsersQuery = 'SELECT * FROM Rectangle';
  pool.query(getUsersQuery, (error, result) => {
    if (error)
    res.send(error);
  var results = {'rows':result.rows}
  res.render('pages/db', results);
  })
  
});
app.post('/adduser', (req, res)=>{
  console.log("post request for /adduser");
  var uname = req.body.uname;
  var age = req.body.age;
  res.send(`username: ${uname}, age: ${age}`);
});
app.get('/users/:id', (req, rest)=>{
var uid = req.params.id;
console.log(req.params.id);
//following the tutorial be like
res.send("got it.");
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
