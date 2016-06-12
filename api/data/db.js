var mongoose = require('mongoose');

var dburl ='mongodb://127.0.0.1:27017/notices-test';

mongoose.connect(dburl);

mongoose.connection.on('connected',function(){
  console.log('connected to', dburl);
});

mongoose.connection.on('disconnected',function(){
  console.log('disconnected');
});

mongoose.connection.on('error',function(err){
  console.log('error in connection', err);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected using the command SIGINT");
    process.exit(0);
  })
});

process.on('SIGTERM', function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected using the command SIGTERM");
    process.exit(0);
  })
});

process.once('SIGUSR2', function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected using the command SIGUSR2");
    process.kill(process.pid,'SIGUSR2');
  })
});



require('./notices.model.js');
