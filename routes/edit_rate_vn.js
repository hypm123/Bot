module.exports = function(bot){


  var express = require("express");
  var fs = require("fs");
  var app = express();
  var request = require('request-promise');

  fs.readFile("./config.json", "utf8", function(err, data){
    if(err){throw err};
    var obj = JSON.parse(data);
    var id_gr_jpy = obj.id_tele_gr.id_gr_jpy
    var id_gr_vnd = obj.id_tele_gr.id_gr_vnd
    var id_gr_back = obj.id_tele_gr.id_gr_back 
    var id_gr_newpayoutjp = obj.id_tele_gr.id_gr_newpayoutjp 
    var id_ad = obj.id_tele_pr.id_tien
    var id_stea = obj.id_tele_pr.id_stea
    var id_mess_edit = obj.id_mess_edit.id_gr_newpayoutjp


    var buy = "https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=5&tradeType=buy&currPage=1&payMethod=0&acceptOrder=0&country=&blockType=general&online=1&range=0&amount="
    var ftx_u = "https://www.binance.com/api/v3/depth?symbol=BTCUSDT&limit=2"
    var okx = "https://www.okcoin.jp/v2/spot/markets/deep-deal?t=1656249148004&symbol=btc_jpy"

    var rate_model = require('../models/rate1');
    var fee_ok = 0.18
    var fee_btc_usdt = 0
    /////////////////////////////////////////////////////

    var d = new Date();
    var day1 = d.getDate()-1
    var check = 0


    function myFunc() {
      var d = new Date();
      var btc_usdt = 0
      var  btc_ok = btc_ftx =0
      request(buy, (error, response, html) => {
        if(!error && response.statusCode == 200) {
          var obj = JSON.parse(html);
          usdt = obj.data[0].price
          request(ftx_u, (error, response, html) => {
            if(!error && response.statusCode == 200) {
              var obj = JSON.parse(html);
              if(obj !== ""){
                btc_usdt = obj.bids[0][0]
              }else{
                btc_usdt = 0
              };
              request(okx, (error, response, html) => {
                if(!error && response.statusCode == 200) { 
                  var obj = JSON.parse(html);
                  if(obj.code == 0){
                    btc_ok = obj.data.asks[0].price
                  
                  }else{
                    btc_ok = 0
                  }
                    
                  btc_bu = (btc_usdt/100*(100-fee_btc_usdt)).toFixed() 
                  btc_o = (btc_ok/100*(100+fee_ok)).toFixed() 
                  var d = new Date();
                  day = d.getDate()
                  var hours = mins = ""
                  if(d.getHours() < 10){
                    hours = "0" + String(d.getHours())
                  }else{
                    hours = String(d.getHours())
                  }
                  if(d.getMinutes() < 10){
                    mins = "0" + String(d.getMinutes())
                  }else{
                    mins = String(d.getMinutes())
                  }

                  var date = hours + ":" + mins
                  var usdt_o = Math.round((btc_o/btc_bu) * 10) / 10
                  var rate1 = Number(usdt_o).toFixed(2)
                  var vnd_o = Math.round((usdt/(btc_o/btc_bu)) * 10) / 10

                  var mess = "⏰ "+date
                            + "  -  *" + vnd_o + "*"
      
                  rate_model.find({}, (err, data)=>{
                    if(err||data.length == 0){
                      console.log("ERR")
                    }else{
                      var rate_mogo = data[0].rate_jpy
                      if(rate_mogo!== rate1){

                      }
                    }
                  })
                  edit_mess(id_gr_newpayoutjp,id_mess_edit,mess)
                  setTimeout(myFunc, 180000)

                }else {
                  setTimeout(myFunc, 180000)
                  
                }
              });
            }else {
              setTimeout(myFunc, 180000)
              
            };
          });
        }
      })
      
      
    }
    setTimeout(myFunc, 2000)
  })

  function edit_mess(chatId,messageId,mess){
    bot.editMessageText(mess, { chat_id: chatId, message_id: messageId,parse_mode: 'Markdown' });
  }
}