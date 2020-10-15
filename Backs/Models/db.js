const mongoose =require('mongoose');


mongoose.connect('mongodb://localhost:27017/mern',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,useFindAndModify: false }
,(err) => {
    if(!err){
        console.log('successful connect database');
    }
    else{
        console.log('error'+err);
    }
});


require("./User");
require("./Todo");