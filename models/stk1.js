const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    check:String,
    time:String,
    bank:String,
    name:String,
    stk:String,
    brach:String
});
module.exports = mongoose.model("stk1", userSchema);