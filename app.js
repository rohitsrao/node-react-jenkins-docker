const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://db:27017/test', {useNewUrlParser: true})
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

const testSchema = new mongoose.Schema({
  num1: Number,
  num2: Number,
  result: Number,
});

const Sum = mongoose.model('sum', testSchema);

//const sum = new Sum({
//  num1: 5,
//  num2: 3,
//  result: 8,
//});
//sum.save()
//  .then(() => console.log("Document saved!"))
//  .catch((err) => console.log(err));

Sum.find((err, sums) => {
  console.log(sums);
});

app.get('/', function (req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1 + num2;
  res.send('The result of calculation is ' + result);
});

module.exports = app
