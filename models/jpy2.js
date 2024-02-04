const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    check:Number,
    
    rate_jpy:{type: Number, default: 0},
    fee_jpy:{type: Number, default: 1},
    back_jpy:{type: Number, default: 0.5},

    id:String, 
    id:{type: String, default: ''},
    stt:{type: String, default: 'A'},

    volum:{type: Number, default: 0},
    balance:{type: Number, default: 0}
});
module.exports = mongoose.model("JPY_ya", userSchema);