const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://db:27017/sumDB', {useNewUrlParser: true})
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

const testSchema = new mongoose.Schema({
  num1: Number,
  num2: Number,
  result: Number,
});

const Sum = mongoose.model('sum', testSchema);

app.get('/', function (req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1 + num2;

  const sum = new Sum({
    num1: num1,
    num2: num2,
    result: result,
  });
  sum.save();

  res.render('result', {result: result});
});

app.get('/history', function (req, res){
  Sum.find({}, function (err, sums){
    res.render('history', {sums: sums});
  })
});

module.exports = app
