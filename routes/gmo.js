var express = require("express");
var fs = require("fs");
var app = express();
const request = require('request-promise');
//tele
var TelegramBot = require('node-telegram-bot-api');
var token = "5433092257:AAHmLHuZUJt7eul8slF0kDnF9wK_NiDDTIQ"
var opt = {polling: true};
var bot = new TelegramBot(token, opt);
//Binance _btc

//houbi otc_usdt
var buy = "https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=5&tradeType=buy&currPage=1&payMethod=0&acceptOrder=0&country=&blockType=general&online=1&range=0&amount="
//bif


var ftx_u = "https://www.binance.com/api/v3/depth?symbol=BTCUSDT&limit=2"


var okx = "https://www.okcoin.jp/v2/spot/markets/deep-deal?t=1656249148004&symbol=btc_jpy"


var fee_btc_usdt = 0
var fee_ok = 0.18
var usdt = usdt1 = 0
var check = 0

/////////////////////////////////////////////////////

bot.onText(/\/usdt (.+)/, (msg, match) => {
  usdt1 = Number(match[1])
  bot.sendMessage(msg.chat.id, "USDT:" + usdt1)
})

bot.onText(/\/okx (.+)/, (msg, match) => {
  fee_ok = Number(match[1])
  bot.sendMessage(msg.chat.id, "Fee OKX:" + fee_ok)
})

bot.onText(/\/fee/, (msg, match) => {
  
  bot.sendMessage(msg.chat.id,"Fee OKX: " + fee_ok)
})

bot.onText(/\/1/, (msg) => {
  var btc_usdt = 0
  var usdt = 0

  request(buy, (error, response, html) => {
    if(!error && response.statusCode == 200) {
      var obj = JSON.parse(html);
      usdt = obj.data[0].price
      // FTX_u
      request(ftx_u, (error, response, html) => {
        if(!error && response.statusCode == 200) {
          var obj = JSON.parse(html);
          if(obj !== ""){
            btc_usdt = obj.bids[0][0]
          }else{
            btc_usdt = 0
          }
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
              var date = String(d.getHours()) + ":" + String(d.getMinutes())  
              var usdt_o = Math.round((btc_o/btc_bu) * 100) / 100

              var vnd_o = Math.round((usdt/(btc_o/btc_bu)) * 10) / 10
              

              var mess = "*Tỉ giá JPY/VND* ⏰ "+date
                        + "\n\nUSDT:                  *" +Math.round((usdt)) + "*\n"
                        + "B(btc/usdt):         *" + (Number(btc_usdt).toFixed()) + "*\n\n"
                        + "OK(btc/jpy):         *" + btc_ok + "*\n\n"
                        + "OK(usdt):        *" + usdt_o + "*\n\n"
                        + "🔴O:                   *"  + vnd_o +"*\n"
        
              bot.sendMessage(msg.chat.id, mess,{parse_mode: 'Markdown'});  
            }
            else {
                bot.sendMessage(msg.chat.id, "Sever đang bảo trì hoặc đang bị lỗi6");
            }
          });
          
        }
        else {
            bot.sendMessage(msg.chat.id, "Sever đang bảo trì hoặc đang bị lỗi2");
        }
      });
    }else {
      bot.sendMessage(msg.chat.id, "Sever đang bảo trì hoặc đang bị lỗi1");
    }
  })
 
});

bot.onText(/\/2/, (msg) => {
  var btc_usdt = 0
  var usdt = 0
  var btc_cc = btc_gmo = btc_ok = btc_ftx =btc_lq = 0

  request(buy, (error, response, html) => {
    if(!error && response.statusCode == 200) {
      var obj = JSON.parse(html);
      usdt = obj.data[0].price
      // FTX_u
      request(ftx_u, (error, response, html) => {
        if(!error && response.statusCode == 200) {
          var obj = JSON.parse(html);
          if(obj !== ""){
            btc_usdt = obj.bids[0][0]
          }else{
            btc_usdt = 0
          }
          //OKcoin
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
              var date = String(d.getHours()) + ":" + String(d.getMinutes())  
              var usdt_o = Math.round((btc_o/btc_bu) * 100) / 100
              var vnd_o = Math.round((usdt1/(btc_o/btc_bu)) * 10) / 10
              var mess = "*Tỉ giá JPY/VND* ⏰ "+date
                        + "\n\nUSDT:                  *" +Math.round((usdt1)) + "*\n"
                        + "B(btc/usdt):         *" + Number(btc_usdt).toFixed() + "*\n\n"
                        + "OK(btc/jpy):         *" + btc_ok + "*\n\n"
                        + "OK(usdt):        *" + usdt_o + "*\n\n"
                        + "🔴O:                   *"  + vnd_o +"*\n"
        
              bot.sendMessage(msg.chat.id, mess,{parse_mode: 'Markdown'});  
            }
            else {
                bot.sendMessage(msg.chat.id, "Sever đang bảo trì hoặc đang bị lỗi");
            }
          });
        }
        else {
            bot.sendMessage(msg.chat.id, "Sever đang bảo trì hoặc đang bị lỗi");
        }
      });
    }else {
      bot.sendMessage(msg.chat.id, "Sever đang bảo trì hoặc đang bị lỗi");
    }
  })
 

   
});
  