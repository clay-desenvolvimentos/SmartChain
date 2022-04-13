var express = require('express')
var https = require('https')
var http = require('http')
var bodyparser = require("body-parser")
var app = express()
var fetch = require('cross-fetch');
const session = require('express-session')
var path = require('path')
const res = require('express/lib/response')

var login = "clay";

app.use(session({secret:'ksagksdgijfhwdsoiahfdsghkfhgsdkjhjklsdhbjkl,ersghbl'}))
app.use(bodyparser.urlencoded({extended:true}))
app.engine("html",require('ejs').renderFile);
app.set('view engine','html');
app.use('/public',express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'./views'));


app.post('/',(req,res)=>{

// Or just: import 'cross-fetch/polyfill';
const url = 'http://44.202.243.116/player/auth/'+ req.body.login + "/" + req.body.password;
fetch(url)
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(user => {
    console.log(user.username);
    if (user.username != null) {
        console.log("Olá")
        req.session.login = login
        res.render('panel-user');
    }else{
        res.render('index');
    }
  })
  .catch(err => {
    console.error(err);
  });


    if(req.body.login == login){
       
    }else{
            

    }
    
   

});

app.get('/',(req,res)=>{

    if (req.session.login) {
        res.render('panel-user');
    }else{
         res.render('index');    
    }

});

    
http.createServer(app).listen(1010)
