var fs = require("fs");

const express = require("express");
const app = express('');
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

fs.readFile("./config.json", "utf8", function(err, data){
    if(err){throw err};
    var obj = JSON.parse(data); 
    //mongoose
    var mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://'+obj.mongodb.username+':'+obj.mongodb.password+'@'+obj.mongodb.server+'/'+obj.mongodb.dbname+'?retryWrites=true&w=majority', function(err){
        if(err){throw err;}else{
            console.log("Mongodb connected successfully.");

            require("./routes/bot payment");
            require("./routes/gmo");

            
        }
    });
});



