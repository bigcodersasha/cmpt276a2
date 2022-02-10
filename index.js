const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();
const { Pool } = require('pg');
var pool = new Pool({
  connectionString: "postgres://postgres:root@localhost/node-js-getting-started"
  //connectionString: process.env.DATABASE_URL
})
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/database', (req,res) => {
  var getUsersQuery = 'SELECT * FROM rectangle';
  pool.query(getUsersQuery, (error, result) => {
    if (error)
    res.end(error);
  var results = {'rows':result.rows}
  res.render('pages/db', results);
  })
  
});
app.post('/addrectangle', (req, res)=>{
  console.log("post request for /addrectangle");
  var name = req.body.name;
  var height = req.body.height;
  var width = req.body.width;
  var color = req.body.color;
  res.send(`name: ${name}, height: ${height}, width: ${width}, color: ${color}`);
});
app.get('/rectangle/:id', (req, rest)=>{
var id = req.params.id;
console.log(req.params.id);
//following the tutorial be like making me cry bro
res.send("got it.");
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
