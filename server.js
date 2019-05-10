'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

app.use(cors());

/** this project needs to parse POST   bodies **/
// you should mount the body-parser here
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var blogSchema = new Schema({
    origUrl:  {type:String,
           required: true},
  });


blogSchema.plugin(autoIncrement.plugin, { model: 'Url', field: 'shortUrl' });

var Url = mongoose.model('Url', blogSchema);

var findOneByUrl = function(url, done) {

  Url.findOne({origUrl:url},function(err,data) {
  if(err) {
    console.log('nothing found');
    return done(err);
  }
  if(data == null){
    console.log('not found');
  }
  return done(null,data);
  });
};

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});

app.get('/api/all',function(req,res,next) { 
next();}, function(req, res) {
  Url.find({}, function(err, data) { 
  if(!err) {
      console.log('found');
      console.log(data);
      res.json(data);
  }
  else{
      console.log('error');
  }
  });
});

app.post('/api/shorturl/new',function(req, res, next) {
next();
}, function(req, res) {
  const dns = require('dns');
  const options = {
    family: 6,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
  };
  var url=require('url');
  var hostname = url.parse(req.body.url).hostname;
  var shortU = 0;
  dns.lookup(hostname, options.family=null, function(err, address, family) {
    if (err === null) {
      console.log ('No Errors: ' + err + ' - ' + address + ' - ' + family);
      
      Url.findOne({origUrl:req.body.url},function(err,data) {
          if(err) {
                console.log('error');
          }
          if(data == null){
                console.log(req.body.url+': NOT FOUND, Creating new entry');
                var newUrl = new Url({origUrl: req.body.url});
                newUrl.save(function(err,data) {
                  if(err){return err;}
                  else{
                    console.log('created entry');
                    res.json({"original_url": req.body.url, "short_url": data.shortUrl});
                    return data;
                  }
                });
          }
          else {
                console.log(data.origUrl+' shortUrl: '+data.shortUrl);
                res.json({"original_url": data.origUrl, "short_url": data.shortUrl});
          }
      });
      
    } else {
        console.log ('Errors: ' + err + ' -- ' + address + ' -- ' + family);
        res.json({"error":"invalid URL"});
      }
  });
});

app.get('/api/shorturl/:short_url?',function(req, res, next) {
next();
}, function(req, res) {
  var shUrl = req.params.short_url;
  if(shUrl == null)
  {
    res.json({"error":"please enter short url value"});
  }
  else
  {
  
    Url.findOne({shortUrl:shUrl},function(err,data) {
          if(err) {
                console.log('error');
          }
          if(data == null){
                console.log('NOT FOUND');
                res.send('Not found');
          }
          else {
                console.log(data.origUrl+' shortUrl: '+data.shortUrl);
                res.redirect(data.origUrl);
          }
      });
    
    
    
  }
});