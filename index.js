const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();
const { Pool }  = require('pg');
var pool = new Pool({
  //connectionString: "postgres://postgres:cmpt276@localhost/rectangle"
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));

app.get('/database', async (req,res) => {
  try {
    const result = await pool.query(`SELECT * FROM rectangle`);
    const data = { results : result.rows };
    res.render('pages/db', data);
  }
  catch (error) {
     res.end(error);
  }
});

app.post('/database', async (req, res)=>{
  try {
  console.log("post request for /database");
  var name = req.body.name;
  var height = req.body.height;
  var width = req.body.width;
  var color = req.body.color;
  var id = req.body.id;
  var action = req.body.action;
  console.log("name: " + name);
  console.log("height: " + height);
  console.log("width: " + width);
  console.log("color: " + color);
  console.log("action: " + action);
  if (action == "Add") {
    if ((name != null) && (height > 0) && (width > 0)){
  const add = `INSERT INTO rectangle (name, height, width, color) VALUES ('${name}', ${height}, ${width}, '${color}')`;
  console.log(add);
  await pool.query(add);
    }
  }
  
  if (action == "Delete" && id != null) {
  const del = `DELETE FROM rectangle where id = ${id}`;
  console.log(del);
  await pool.query(del);
  }

  if (action == "Update" && id != null) {
    if (name != "") {
      const updateName = `UPDATE rectangle SET name = '${name}' where id = ${id}`;
      console.log(updateName);
      await pool.query(updateName);
    }
    if (height > 0) {
      const updateHeight = `UPDATE rectangle SET height = ${height} where id = ${id}`;
      console.log(updateHeight);
      await pool.query(updateHeight);
    }
    if (width > 0) {
      const updateWidth = `UPDATE rectangle SET width = ${width} where id = ${id}`;
      console.log(updateWidth);
      await pool.query(updateWidth);
    }
    if (color != "#000000") {
      const updateColor = `UPDATE rectangle SET color = '${color}' where id = ${id}`;
      console.log(updateColor);
      await pool.query(updateColor);
    }
  }

  if (action == "Go to" && id != null) {
    res.redirect('/rectangle/' + id + '/');
  } else {
res.redirect('/database');
  }

  }
catch (error) {
  res.end(error);
}

});

app.get('/rectangle/:id', async (req,res) => {
  try {
    var uid = req.params.id;
    const result = await pool.query(`SELECT * FROM rectangle where id=${uid}`);
    const data = { results : result.rows };
    res.render('pages/rectangle', data);
  }
  catch (error) {
     res.end(error);
  }
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
