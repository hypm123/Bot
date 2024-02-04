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
    var id_ad = obj.id_tele_pr.id_tien
    var id_stea = obj.id_tele_pr.id_stea
    var id_mess_edit = obj.id_mess_edit.id_gr_jpy

    var ftx_u = "https://www.binance.com/api/v3/depth?symbol=BTCUSDT&limit=2"
    var okx = "https://www.okcoin.jp/v2/spot/markets/deep-deal?t=1656249148004&symbol=btc_jpy"

    var rate_model = require('../models/rate1');
    var fee_btc_usdt = 0
    var fee_jpy = 0
    var rate_jpy = 1.1
    var back_jpy = 0.5
    var fee_vnd = 0
    var rate_vnd = 1
    var back_vnd = 0.5
    var vl_back = 0
    /////////////////////////////////////////////////////

    var d = new Date();
    var day1 = d.getDate()-1
    var check = 0

    rate_model.find({}, (err, data)=>{
      if(err){
        bot.sendMessage(msg.chat.id, "ERR")
      }else{
          if(data==''){
            bot.sendMessage(msg.chat.id, "Lỗi check = 1")
          }else{
            fee_jpy = data[0].fee_jpy;
            rate_jpy = data[0].rate_jpy;
            back_jpy = data[0].back_jpy;

            fee_vnd = data[0].fee_vnd;
            rate_vnd = data[0].rate_vnd;
            back_vnd = data[0].back_vnd;

            vl_back =data[0].vl_back;
          }
      }
    })
    function myFunc() {
      var d = new Date();
      var btc_usdt = 0
      var  btc_ok = btc_ftx =0
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
              btc_o = (btc_ok/100*(100+fee_jpy)).toFixed() 
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
              var mess = "⏰ "+date
                        + "  -  *" + usdt_o + "*"
  
              rate_model.find({}, (err, data)=>{
                if(err||data.length == 0){
                  console.log("ERR")
                }else{
                  var rate_mogo = data[0].rate_jpy
                  if(rate_mogo!== rate1){

                  }
                }
              })
              rate_model.updateMany({}, {rate_jpy:Number(rate1)}, (err)=>{
                if(err){
                  bot.sendMessage(msg.chat.id, "ERR")
                }else{
                  rate_model.updateMany({}, {time:date}, (err)=>{
                    if(err){
                      bot.sendMessage(msg.chat.id, "ERR")
                    }else{
                      edit_mess(id_gr_jpy,id_mess_edit,mess)
                    }
                  })
                }
              })

              setTimeout(myFunc, 61000)

            }else {
              setTimeout(myFunc, 180000)
              
            }
          });
        }else {
          setTimeout(myFunc, 180000)
          
        };
      });
      
      
    }
    setTimeout(myFunc, 2000)
    bot.onText(/\/menu/, (msg) => {
      //var mess = "Danh sách lệnh\n\n"
      // /done (X) - done X usdt
      // /rate_jpy (X) - update rate_jpy
      // /fee_jpy (X) - update fee_jpy
      // /back_jpy (X) - update fee back_jpy
      // /vl_back (X) - update vl_back
      // /check (X) - update check bot
      // / - check data mogo
      // /check_bot - check data bot
      // /new_bot - tạo data mogo mới
      // /check_back - check số dư
      if (msg.from.id == id_ad ){
        var mess = "Danh sách lệnh\n\n" 
                  + "/done (X) - done X usdt\n\n"
                  + "/rate_jpy (X) - update rate_jpy\n\n"
                  + "/fee_jpy (X) - update fee_jpy\n\n"
                  + "/back_jpy (X) - update fee back_jpy\n\n"
                  + "/vl_back (X) - update vl_back\n\n"
                  + "/check (X) - update check bot\n\n"
                  + "/check_bot - check data bot\n\n"
                  + "/new_bot - tạo data mogo mới\n\n"
                  + "/check_back - check số dư"
        bot.sendMessage(msg.chat.id, mess)
      }
    })

    bot.onText(/\/rate_jpy (.+)/, (msg, match) => {
      //rate = Number(match[1])
      //
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
      // 
      if (msg.from.id == id_ad ){
        rate_model.find({}, (err, data)=>{
          if(err){
            bot.sendMessage(msg.chat.id, "ERR")
          }else{
              if(data==''){
                bot.sendMessage(msg.chat.id, "Lỗi check = 1")
              }else{
                rate_model.updateMany({}, {rate_jpy:Number(match[1])}, (err)=>{
                  if(err){
                    bot.sendMessage(msg.chat.id, "ERR")
                  }else{
                    rate_model.updateMany({}, {time:date}, (err)=>{
                      if(err){
                        bot.sendMessage(msg.chat.id, "ERR")
                      }else{
                        rate_jpy = Number(match[1])
                        bot.sendMessage(msg.chat.id, "Success rate: *" + rate_jpy + "*",{parse_mode: 'Markdown'});                
                      }
                    })
                  }
                })
              }
          }
        })
      }else{
        bot.sendMessage(msg.chat.id, "Không đủ quyền thao tác lệnh này")
      };

      
    })

    bot.onText(/\/fee_jpy (.+)/, (msg, match) => {
      //rate = Number(match[1])
      //

      if (msg.from.id == id_ad ){
        rate_model.find({}, (err, data)=>{
          if(err){
            bot.sendMessage(msg.chat.id, "ERR")
          }else{
              if(data==''){
                bot.sendMessage(msg.chat.id, "Lỗi check = 1")
              }else{
                rate_model.updateMany({}, {fee_jpy:Number(match[1])}, (err)=>{
                  if(err){
                    bot.sendMessage(msg.chat.id, "ERR")
                  }else{
                    fee_jpy = Number(match[1])
                    bot.sendMessage(msg.chat.id, "Success fee: *" + fee_jpy + "*",{parse_mode: 'Markdown'});  
                  }
                })
              }
          }
        })
      }else{
        bot.sendMessage(msg.chat.id, "Không đủ quyền thao tác lệnh này")
      };
    })

    bot.onText(/\/back_jpy (.+)/, (msg, match) => {
      //rate = Number(match[1])
      //

      if (msg.from.id == id_ad ){
        rate_model.find({}, (err, data)=>{
          if(err){
            bot.sendMessage(msg.chat.id, "ERR")
          }else{
              if(data==''){
                bot.sendMessage(msg.chat.id, "Lỗi check = 1")
              }else{
                rate_model.updateMany({}, {back_jpy:Number(match[1])}, (err)=>{
                  if(err){
                    bot.sendMessage(msg.chat.id, "ERR")
                  }else{
                    back_jpy = Number(match[1])
                    bot.sendMessage(msg.chat.id, "Success back.jpy: *" + back_jpy + "*",{parse_mode: 'Markdown'});  
                  }
                })
              }
          }
        })
      }else{
        bot.sendMessage(msg.chat.id, "Không đủ quyền thao tác lệnh này")
      };
    })

    bot.onText(/\/vl_back (.+)/, (msg, match) => {
      //rate = Number(match[1])
      //

      if (msg.from.id == id_ad ){
        rate_model.find({}, (err, data)=>{
          if(err){
            bot.sendMessage(msg.chat.id, "ERR")
          }else{
              if(data==''){
                bot.sendMessage(msg.chat.id, "Lỗi check = 1")
              }else{
                rate_model.updateMany({}, {vl_back:Number(match[1])}, (err)=>{
                  if(err){
                    bot.sendMessage(msg.chat.id, "ERR")
                  }else{
                    vl_back = Number(match[1])
                    bot.sendMessage(msg.chat.id, "Success vl.back: *" + vl_back + "*",{parse_mode: 'Markdown'});  
                  }
                })
              }
          }
        })
      }else{
        bot.sendMessage(msg.chat.id, "Không đủ quyền thao tác lệnh này")
      };
    })

    bot.onText(/\/check_mogo/, (msg, match) => {
      //rate = Number(match[1])
      //

      if (msg.chat.id == id_ad ){
        rate_model.find({}, (err, data)=>{
          if(err){
            bot.sendMessage(msg.chat.id, "ERR")
          }else{
              if(data==''){
                bot.sendMessage(msg.chat.id, "Lỗi check = 1")
              }else{
                var mess = ""
                mess = mess + "⏰ " + data[0].time+ "\n\nCheck:   " + data[0].check + "\n\nRate.jpy:   *" + data[0].rate_jpy + "*\nFee.jpy:     *" + data[0].fee_jpy +"* %" + "\nBack.jpy:   *" + data[0].back_jpy +"* %"
                mess = mess + "\n\nRate.vnd:   *" + data[0].rate_vnd + "*\nFee.vnd:     *" + data[0].fee_vnd +"* %" + "\nBack.vnd:   *" + data[0].back_vnd +"* %"
                mess = mess + "\n\nVL.back:     *" + data[0].vl_back +"* USDT"
              
                bot.sendMessage(msg.chat.id, mess,{parse_mode: 'Markdown'}); 
          
              }
          }
        })
      }else{
        bot.sendMessage(msg.chat.id, "Không đủ quyền thao tác lệnh này")
      }; 
    })
    bot.onText(/\/check_bot/, (msg) => {
      //rate = Number(match[1])
      //

      if (msg.chat.id == id_ad ){
        var mess =  "Check:   "  + "\n\nRate.jpy:   *" + rate_jpy + "*\nFee.jpy:     *" + fee_jpy +"* %" + "\nBack.jpy:   *" + back_jpy +"* %"
        + "\n\nRate.vnd:   *" + rate_vnd + "*\nFee.jpy:      *" + fee_vnd +"*  %" + "\nBack.vnd:   *" + back_vnd +"* %"
      
        bot.sendMessage(msg.chat.id, mess,{parse_mode: 'Markdown'}); 
      }else{
        bot.sendMessage(msg.chat.id, "Không đủ quyền thao tác lệnh này")
      }; 
    })

   

    bot.onText(/\/check_back/, (msg) => {
      if (msg.from.id == id_ad || msg.from.id == id_stea){
        rate_model.find({}, (err, data)=>{
          if(err){
            bot.sendMessage(msg.chat.id, "ERR")
          }else{
            if(data==''){
              bot.sendMessage(msg.chat.id, "Lỗi check = 1")
            }else{
              var mess = "*" + data[0].vl_back + "* USDT"
              bot.sendMessage(msg.chat.id, mess,{parse_mode: 'Markdown'}); 
            }
          }
        })
      }else{
        bot.sendMessage(msg.chat.id, "Không đủ quyền thao tác lệnh này")
      };

    })

    bot.onText(/\/id/, (msg) => {
      console.log(msg.from.id)
      var mess = "ID: " + msg.from.id + "\nID_gr: " + msg.chat.id
      bot.sendMessage(msg.chat.id, mess)
    })

    bot.onText(/\/new_bot/, (msg) => {
      if (msg.from.id == id_ad ){

        var obj_insert = {
          
        }

      rate_model.create(obj_insert, (err)=>{
          if(err){
            bot.sendMessage(msg.chat.id, "ERR")
          }else{
            bot.sendMessage(msg.chat.id, "Success")
          }
      })

      }else{
        bot.sendMessage(msg.chat.id, "Không đủ quyền thao tác lệnh này")
      };

      
    })
  })

  bot.onText(/\/cc/, (msg) => {
    const message = 'Hello, world!';
    chatId = msg.chat.id;
    bot.sendMessage(chatId, message).then((sentMessage) => {
      messageId = sentMessage.message_id;
      const editedMessage = 'Hello, edited message!';
      console.log(chatId,messageId)
      bot.editMessageText(editedMessage, { chat_id: chatId, message_id: messageId });
    });
    
  });
  function edit_mess(chatId,messageId,mess){
    bot.editMessageText(mess, { chat_id: chatId, message_id: messageId,parse_mode: 'Markdown' });
  }
}