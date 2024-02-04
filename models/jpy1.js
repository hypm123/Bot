const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    check:Number,
    
    rate_jpy:{type: Number, default: 0},
    fee_jpy:{type: Number, default: 1},
    back_jpy:{type: Number, default: 0.5},

    id:String,
    time:{type: String, default: ''},
    type:{type: String, default: 'A'},
    out:{type: Number, default: 0},
    rate:{type: Number, default: 0},
    fee:{type: Number, default: 0},
    volum:{type: Number, default: 0},
    balance:{type: Number, default: 0}
});
module.exports = mongoose.model("JPY1", userSchema);