var express = require('express')
var https = require('https')
var http = require('http')
var bodyparser = require("body-parser")
var app = express()
var fetch = require('cross-fetch');
const session = require('express-session')
var path = require('path')
const res = require('express/lib/response')
const fail = require('./public/js/scripts');
const ejs = require('ejs')
var login = "clay";

app.use(session({secret:'ksagksdgijfhwdsoiahfdsghkfhgsdkjhjklsdhbjkl,ersghbl'}))
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine', 'ejs');
app.use('/public',express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'./views'));


app.post('/',(req,res)=>{
  // Or just: import 'cross-fetch/polyfill';
const url = 'http://44.202.243.116/user/auth/'+ req.body.login + "/" + req.body.password;
fetch(url)
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    console.log("passei aqui");
    return res.json();
  })
  .then(user => {
      console.log(user.username + " " + req.body)
      if (user.username == req.body.login) {
        console.log("Olá")
        req.session.login = login
        res.render('panel-user');
      }

      console.log(user);
  })
  .catch(err => {
    console.log('ok');
    res.render('index', {error: true});
  });
});
app.get('/',(req,res)=>{

    if (req.session.login) {
        res.render('panel-user');
    }else{
         res.render('panel-user', {error: false});    
    }
});    
http.createServer(app).listen(1010)
