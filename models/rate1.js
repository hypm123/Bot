const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    check:Number,
    time:{type: String, default: ''},
    rate_jpy:{type: Number, default: 0},
    fee_jpy:{type: Number, default: 1},
    back_jpy:{type: Number, default: 0.5},
    rate_vnd:{type: Number, default: 0},
    fee_vnd:{type: Number, default: 0},
    back_vnd:{type: Number, default: 0},
    vl_back:{type: Number, default: 0}
});
module.exports = mongoose.model("Rate1", userSchema);