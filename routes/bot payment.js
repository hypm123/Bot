var express = require("express");
var fs = require("fs");
var app = express();
var request = require('request-promise');
//tele
var TelegramBot = require('node-telegram-bot-api');
// real 5700531507:AAGheAmzlb5i-982tEWq3qEZzhtgEn91c0A
//bot test 5733287121:AAGYWtOMikNmexcdwgx0I8xid6-mNNfPBig
var token = "5700531507:AAGheAmzlb5i-982tEWq3qEZzhtgEn91c0A"
var opt = {polling: true};
var bot = new TelegramBot(token, opt);
// gr -734195781

fs.readFile("./config.json", "utf8", function(err, data){
  if(err){throw err};
  var obj = JSON.parse(data);
  /////////////////////
  var express = require("express");
  var fs = require("fs");
  var { resolve } = require("path");
  var request = require('request-promise');

  var id_ad = obj.id_tele_pr.id_tien
  var id_ad2 = obj.id_tele_pr.id_dai
  var id_xn1 = obj.id_tele_pr.id_xn1
  var id_xn2 = obj.id_tele_pr.id_xn2
  var id_xn3 = obj.id_tele_pr.id_xn3 // QC

  var to_address = amount = id_group = ""

  const key1 = "56fed148-8ef0-40a4-9422-bbc402fcbb7e"
  const secret1 = "096AE8BE476909A958BB2028D47477CD"
  const Passphrase1 = "Tien1234@"

  var trc1 = 'TYfvfGv2L73CSK8Vnngyse2vQwd1p4SikJ'

  function delay(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
  }

  function Withdrawal_OKX(amount,to_address,chatId,messageId) { 
    console.log("Withdrawal_OKX()")
    var key = key1
    var secret = secret1

    var Passphrase = Passphrase1
    var d = Date.now()/1000
    var ts = String(d)
    amount = String(Number(amount))

    var crypto = require('crypto')
    var secretKey = secret
    var payload = ts +'POST'+'/api/v5/asset/withdrawal' + '{"amt":"'+amount+'","fee":"1","dest":"4","ccy":"USDT","chain":"USDT-TRC20","toAddr":"'+to_address+'"}'
    var sign = crypto.createHmac('sha256', secretKey).update(payload).digest('base64') //base64

    const axios = require('axios');

    const options = {
      method: 'POST',
      url: 'https://www.okx.com/api/v5/asset/withdrawal',
      headers: {
        APPLICATION_JSON: 'application/json',
        'CONTENT_TYPE': 'Content-Type',
        'OK-ACCESS-KEY': key,
        'OK-ACCESS-SIGN': sign,
        'OK-ACCESS-TIMESTAMP': ts,
        'OK-ACCESS-PASSPHRASE': Passphrase
      },
      data: {
        amt:amount,
        fee:"1",
        dest:"4",
        ccy:"USDT",
        chain:"USDT-TRC20",
        toAddr:to_address
      }
    };

    axios
    .request(options)
    .then(function (response) {
      console.log(response.data)
      if(response.data.code == '0'){
        var wdId = response.data.data[0].wdId
        bot.editMessageText("Sending_id: "+wdId, { message_id: messageId, chat_id: chatId});
        delay5()
        async function delay5() {
          await delay(60000)
          deposit_withdraw(wdId,chatId,messageId,amount)
        }
      }else{
        var mess = "ERR!!! \n"+response.data.msg
        bot.editMessageText(mess, { message_id: messageId, chat_id: chatId});
      }

    })
    .catch(function (error) {
      bot.editMessageText("ERR!!!", { message_id: messageId, chat_id: chatId});
      console.error(error);
    });
  }

  
  function deposit_withdraw(wdId,chatId,messageId,amount) {
    console.log("deposit_withdraw()")
    var key = key1
    var secret = secret1

    var Passphrase = Passphrase1
    var d = Date.now()/1000
    var ts = String(d)


    var crypto = require('crypto')
    var secretKey = secret
    var payload = ts +'GET'+'/api/v5/asset/deposit-withdraw-status?wdId=' + wdId
    var sign = crypto.createHmac('sha256', secretKey).update(payload).digest('base64') //base64

    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://www.okx.com/api/v5/asset/deposit-withdraw-status?wdId='+wdId,
      headers: {
        APPLICATION_JSON: 'application/json',
        'CONTENT_TYPE': 'Content-Type',
        'OK-ACCESS-KEY': key,
        'OK-ACCESS-SIGN': sign,
        'OK-ACCESS-TIMESTAMP': ts,
        'OK-ACCESS-PASSPHRASE': Passphrase
      }
    };

    axios
    .request(options)
    .then(function (response) {
      if(response.data.code == '0'){
        var txId = response.data.data[0].txId
        var state = response.data.data[0].state
        if(txId !== ''){
          var mess = 'done ' + amount +"\n"+txId
          bot.editMessageText(mess, { message_id: messageId, chat_id: chatId});
          if(chatId == "-734195781" || chatId == "-1001959263622"){
            back_usdt(chatId,String(amount))
          };
        }else{
          var mess = state 
          bot.editMessageText(mess, { message_id: messageId, chat_id: chatId});
          delay5()
          async function delay5() {
            await delay(30000)
            deposit_withdraw(wdId,chatId,messageId,amount)
          }
        }
        
      }else{
        bot.editMessageText("Done!!!", { message_id: messageId, chat_id: chatId});
      }
    })
    .catch(function (error) {
      bot.editMessageText("Donee!!!", { message_id: messageId, chat_id: chatId});
    });
  }

  function history(chatId) {
    var key = key1
    var secret = secret1

    var Passphrase = Passphrase1
    var d = Date.now()/1000
    var ts = String(d)
    var crypto = require('crypto')
    var secretKey = secret
    var payload = ts +'GET'+'/api/v5/asset/withdrawal-history'
    var sign = crypto.createHmac('sha256', secretKey).update(payload).digest('base64') //base64

    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://www.okx.com/api/v5/asset/withdrawal-history',
      headers: {
        APPLICATION_JSON: 'application/json',
        'CONTENT_TYPE': 'Content-Type',
        'OK-ACCESS-KEY': key,
        'OK-ACCESS-SIGN': sign,
        'OK-ACCESS-TIMESTAMP': ts,
        'OK-ACCESS-PASSPHRASE': Passphrase
      }
    };

    axios
    .request(options)
    .then(function (response) {
      if(response.data.code == '0'){
        var txId = response.data.data[0].txId
        var state = response.data.data[0].state
        var mess = ""
        var stt = 0
        for(var i = 2 ; i>-1; i--){
          stt=stt+1 
          var to = response.data.data[i].to
          var amt = response.data.data[i].amt
          var txId = response.data.data[i].txId

          mess = mess + stt + "\nTo: " + to + "\nAmt: " + amt + " USDT\ntxId: " + txId + "\n\n"
        }

        bot.sendMessage(chatId, mess)
        
      }else{
        bot.sendMessage(chatId, "ERR")
      }
    })
    .catch(function (error) {
      bot.sendMessage(chatId, "ERR")
    });
  }
  bot.onText(/\/his/, (msg, match) => {
    var chatId = msg.chat.id
    history(chatId)
  })
  bot.on('message', (msg) => {
    const chatId = msg.chat.id; // Đây là chat_id của người dùng hoặc nhóm chat
    console.log(11111)
    // Các logic xử lý khác...
});
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;
  const userId = callbackQuery.from.id;
  const dataFromButton = callbackQuery.data; // dữ liệu bạn đã đặt cho nút

  // Xử lý tương tác từ người dùng
  // Ví dụ: gửi một thông báo cho họ về nút mà họ vừa nhấp
  console.log(11111)
});

  bot.onText(/\/en/, (msg, match) => {
    var chatId = msg.chat.id
    if(msg.from.id == id_ad){
      const axios = require('axios');

      // Dữ liệu JSON bạn muốn gửi
      const requestData = {
          username: "hypm123",
          password: "Tien12062000",
          resType: "ENERGY",
          payNums: 1,
          rentTime: 1,
          resLock: 0,
          receiveAddress: "TPMgrEeU1gKbEWenRkWc9vNRB1vbB62VN1"
      };

      // URL của endpoint bạn muốn gửi POST request đến
      const url = "https://tronfee.io/api/pay";

      axios.post(url, requestData)
          .then(async function (response) {
           
            console.log("Kết quả:", response.data);
            if (response.data.code == 10000) {
                var balance = (response.data.data.balance / 1000000).toFixed(2);
                var fee = response.data.data.orderMoney;
                var mess = "DONE \nFee: " + fee + "\nBalance: " + balance;
                bot.sendMessage(msg.chat.id, mess);
                var orderId = response.data.data.orderId;
                
            } else {
                bot.sendMessage(msg.chat.id, "err: " + response.data.msg);
            }
          })
          .catch(function (error) {
              console.error("Lỗi:", error);
              bot.sendMessage(msg.chat.id, error.message);
          });

      

    }

  })
  bot.onText(/\/an (.+)/, (msg, match) => {
    var chatId = msg.chat.id
    var address = match[1]
    if(msg.from.id == id_ad){
      const axios = require('axios');

    // Dữ liệu JSON bạn muốn gửi
      const requestData = {
        username: "hypm123",
        password: "Tien12062000",
        resType: "ENERGY",
        payNums: 32000,
        rentTime: 1,
        resLock: 0,
        receiveAddress: address
      };
      console.log(requestData)
      // URL của endpoint bạn muốn gửi POST request đến
      const url = "https://tronfee.io/api/pay";

      // Gửi POST request
      axios.post(url, requestData)
        .then(async function (response) {
          console.log("Kết quả:", response.data);
          if(response.data.code ==10000){
            var balance = (response.data.data.balance/1000000).toFixed(2)
            var fee = response.data.data.orderMoney
            var yourOrderId = response.data.data.orderId
            var mess = "DONE \nFee: " +fee +"\nBalance: " + balance
            bot.sendMessage(msg.chat.id, mess)
            
          }else{
            bot.sendMessage(msg.chat.id, "err: "+response.data.msg)
          }
          
        })
        .catch(function (error) {
          console.error("Lỗi:", error);
          bot.sendMessage(msg.chat.id, error.msg)
        });
    }

  })
  bot.onText(/\/done (.+)/, (msg, match) => {
    if(msg.from.id == id_ad){
      var amt = match[1]
      if(!isNaN(Number(amt))){
        amount = String(Number(amt))
        back_usdt(msg.chat.id,String(amount))
      }

    }
  })
  bot.onText(/\/usdt/, (msg, match) => {
    to_address = amount = id_group = ""
    if(msg.from.id == id_ad||msg.from.id == id_ad2){
      var str = msg.text.replace("/usdt ", "").replace("/usdt\n", "")
      str =str.replace(/[\r\n]+/g, " ")
      var arr = str.split(' ')
      var amt = arr[1].replace(/,/g, "")

      
      var timestamp = Number(Math.floor(Date.now() / 1000))
      var time_mess = Number(msg.date)
      var time = timestamp - time_mess // giaay

      if(time < 15){
        to_address = arr[0]
        amount = ''

        if(!isNaN(Number(amt))){
          amount = String(Number(amt))
        }
        if(to_address.length > 10 && Number(amount)>0&& Number(amount)<1500000){
          
          id_group = String(msg.chat.id)
          var mess = 'Please confirm the information is correct /yes' + " \nto_address: " + to_address + " \namount: "+amount + " USDT"
          bot.sendMessage(id_group, mess)
        }else{
          to_address = amount = id_group = ""
          var mess = "ERR address or amount"
          bot.sendMessage(msg.chat.id, mess,{parse_mode: 'Markdown'});
        }
      }else{
        to_address = amount = id_group = ""
      }
    }else{
      console.log('Không Đủ quyền')
    }
  })
  function Get_balance(chatId) {
    var key = key1
    var secret = secret1

    var Passphrase = Passphrase1
    var d = Date.now()/1000
    var ts = String(d)


    var crypto = require('crypto')
    var secretKey = secret
    var payload = ts +'GET'+'/api/v5/asset/balances?ccy=USDT'
    var sign = crypto.createHmac('sha256', secretKey).update(payload).digest('base64') //base64

    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://www.okx.com/api/v5/asset/balances?ccy=USDT',
      headers: {
        APPLICATION_JSON: 'application/json',
        'CONTENT_TYPE': 'Content-Type',
        'OK-ACCESS-KEY': key,
        'OK-ACCESS-SIGN': sign,
        'OK-ACCESS-TIMESTAMP': ts,
        'OK-ACCESS-PASSPHRASE': Passphrase
      }
    };

    axios
    .request(options)
    .then(function (response) {
      if(response.data.code == '0'){
        console.log(response.data.data[0])
        var sl = Number(response.data.data[0].availBal).toFixed()
        console.log(sl)
        var mess = "Balance: " + sl +  " USDT"
        bot.sendMessage(chatId, mess)
      }
    })
    .catch(function (error) {
      //bot.editMessageText("ERR2!!!", { message_id: messageId, chat_id: chatId});
    });
  }

  bot.onText(/\/balance/, (msg, match) => {
    if(msg.from.id == id_ad||msg.from.id == id_ad2|| msg.chat.id=="-989624213"){
      var chatId = msg.chat.id
      Get_balance(chatId)
    }
  })
  bot.onText(/\/yes/, (msg, match) => {
    if(msg.from.id == id_xn1 ||  msg.from.id == id_xn2||  msg.from.id == id_ad ||  msg.from.id == id_xn3){ //id nguoi xác nhận
      if( String(msg.chat.id) == id_group && to_address !== "" && Number(amount)>1){ //id nguoi xác nhận
        var timestamp = Number(Math.floor(Date.now() / 1000))
        var time_mess = Number(msg.date)
        var time = timestamp - time_mess // giaay
        if(time < 15){
          bot.sendMessage(msg.chat.id, 'Thanks you!!!').then((sentMessage) => {
            var messageId = sentMessage.message_id
            var chatId = String(msg.chat.id)
            console.log(chatId,messageId)
            ////
            bot.editMessageText("Sending", { message_id: messageId, chat_id: chatId});
            // Withdrawal_OKX(amount,to_address,chatId,messageId)
            Withdrawal_usdt(amount,to_address,chatId,String(messageId))
            to_address = amount = id_group = ""
          })
          
        }
      }
    }else{
      console.log('Không Đủ quyền Xác nhận')
      to_address = amount = id_group = ""
    }
  })
  // Withdrawal_usdt("2","THGzSzV53wbBXiyPmd8FPi7BTyX8b8WsFN","1700213852","13898")
  function Withdrawal_usdt(amount,to_address,chatId,messageId){
    const TronWeb = require('tronweb');
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");
    const privateKeyTron = "ddd8e5bfe5589e23049c8829389b107e92b842662f266e3effcd9c66c7dc6768";
    const usdt_contract_tron = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer,privateKeyTron);

    const fromAddress = "TYfvfGv2L73CSK8Vnngyse2vQwd1p4SikJ";

    check_fee(amount,to_address,chatId,messageId)
    async function check_fee(amount,to_address,chatId,messageId) {
        const toAddressTron = to_address;
        try {
            const abiContract = await tronWeb.trx.getContract(usdt_contract_tron);
            const contract = tronWeb.contract(abiContract.abi.entrys, usdt_contract_tron);
            const balanceUSDT  = await contract.methods.balanceOf(fromAddress).call()/Math.pow(10,6);
            console.log("USDT Balance:", balanceUSDT.toString());
            const balanceTRX =await tronWeb.trx.getBalance(fromAddress)/Math.pow(10,6);
            console.log("TRX balance:", balanceTRX);

            var functions = 'transfer(address,uint256)';
            var options = {};
            var parameter = [{
                type: 'address',
                value: toAddressTron
            }, {
                type: 'uint256',
                value: Math.round(Number(amount) * 1000000)
            }];
            var issuerAddress = tronWeb.address.toHex(fromAddress);
            const txConstant = await tronWeb.transactionBuilder.triggerConstantContract(usdt_contract_tron, functions,options,parameter,issuerAddress);
            var energy_used = txConstant.energy_used; //energy sử dụng
            console.log(energy_used)
            if(energy_used<32000){
                buy_energy(32000,fromAddress,to_address,amount,chatId,messageId)
                // Withdrawal_trc(amount,to_address,chatId,messageId)
            }else{
                if(energy_used<65000 && energy_used>32000){
                    buy_energy(65000,fromAddress,to_address,amount,chatId,messageId)
                }else{
                    bot.editMessageText("Fee send hight", { chat_id: chatId, message_id: messageId });                
                }
            }
        } catch (error) {
            console.log(error);
            bot.editMessageText("err", { chat_id: chatId, message_id: messageId });
        }
        
    }  

    function buy_energy(payNums,receiveAddress,to_address,amount,chatId,messageId){
      console.log("buy_energy")
        const axios = require('axios');

        // Dữ liệu JSON bạn muốn gửi
        const requestData = {
            username: "hypm123",
            password: "Tien12062000",
            resType: "ENERGY",
            payNums: Number(payNums),
            rentTime: 1,
            resLock: 0,
            receiveAddress: receiveAddress
        };

        // URL của endpoint bạn muốn gửi POST request đến
        const url = "https://tronfee.io/api/pay";

        // Gửi POST request
        axios.post(url, requestData)
        .then(function (response) {
            console.log("Kết quả:", response.data);
            if(response.data.code ==10000){
                var balance = (response.data.data.balance/1000000).toFixed(2)
                var fee = response.data.data.orderMoney
                var mess = "DONE \nFee: " +fee +"\nBalance: " + balance
                // bot.sendMessage(msg.chat.id, mess)
                Withdrawal_trc(amount,to_address,chatId,messageId)
            }else{
                bot.editMessageText("err", { chat_id: chatId, message_id: messageId });
            }
            
        })
        .catch(function (error) {
            console.error("Lỗi:", error);
            bot.editMessageText(error.msg, { chat_id: chatId, message_id: messageId });
        });
        
    }

    async function Withdrawal_trc(amount,to_address,chatId,messageId){
      console.log("Withdrawal_trc")
        try {
            const abiContract = await tronWeb.trx.getContract(usdt_contract_tron);
            const contract = tronWeb.contract(abiContract.abi.entrys, usdt_contract_tron);
            const balanceUSDT  = await contract.methods.balanceOf(fromAddress).call()/Math.pow(10,6);
            console.log("USDT Balance:", balanceUSDT.toString());
            const balanceTRX =await tronWeb.trx.getBalance(fromAddress)/Math.pow(10,6);
            console.log("TRX balance:", balanceTRX);

            var functions = 'transfer(address,uint256)';
            var options = {};
            var parameter = [{
                type: 'address',
                value: to_address
            }, {
                type: 'uint256',
                value: Math.round(Number(amount) * 1000000)
            }];
            var issuerAddress = tronWeb.address.toHex(fromAddress);

            const tx = await tronWeb.transactionBuilder.triggerSmartContract(usdt_contract_tron, functions,options,parameter,issuerAddress);    
            const signature = await tronWeb.trx.sign(tx.transaction);
            
            var bandwidth = await estimateBandwidth(signature); //bandwidth sử dụng
            const txConstant = await tronWeb.transactionBuilder.triggerConstantContract(usdt_contract_tron, functions,options,parameter,issuerAddress);
            var energy_used = txConstant.energy_used; //energy sử dụng
            var TRXFees = (bandwidth*1000 + energy_used*420)/Math.pow(10,6); //phí TRX
            console.log("fee: ",TRXFees);
            if(TRXFees <= 50)
            {
                const broadcast = await tronWeb.trx.sendRawTransaction(signature);
                if(broadcast.result == true){
                  var txid = broadcast.txid
                  console.log(txid)
                  var mess = "DONE " + amount + "\n"+txid
                  bot.editMessageText(mess, { chat_id: chatId, message_id: messageId });
                  if(chatId=="-1001959263622"){
                    back_usdt(chatId,String(amount))
                  }
                  
                }else{
                  bot.editMessageText("DONE so not hash", { chat_id: chatId, message_id: messageId });
                }
                // console.log("result:", broadcast);
                // console.log(broadcast.result)
                ///
            }else{
                bot.editMessageText("Fee send high", { chat_id: chatId, message_id: messageId });
            }      
        } catch (error) {
            console.log(error);
            bot.editMessageText(error.msg, { chat_id: chatId, message_id: messageId });
        }
    }

    function estimateBandwidth(signedTxn)
    {
        const DATA_HEX_PROTOBUF_EXTRA = 3;
        const MAX_RESULT_SIZE_IN_TX = 64;
        const A_SIGNATURE = 67;

        var len = signedTxn.raw_data_hex.toString().length /2 + DATA_HEX_PROTOBUF_EXTRA + MAX_RESULT_SIZE_IN_TX  ;
        var signatureListSize = signedTxn.signature.length;
        console.log(signatureListSize)
        for(let i=0;i<signatureListSize;i++)
        {
            len += A_SIGNATURE;
        }
        return len;
    } 
  }

  function back_usdt(chat_id,amount) {
    var rate_model = require('../models/rate1')
    var id_gr_jpy= "-734195781"
    var id_gr_vnd = "-1001959263622"
    var id_gr_back = "-875593859"
    rate_model.find({}, (err, data)=>{
      if(err){
        bot.sendMessage(id_gr_back, "ERR")
      }else{
          if(data==''){
            bot.sendMessage(id_gr_back, "Lỗi check = 1")
          }else{
            var fee_back =  Number(Math.round(((Number(amount)*data[0].back_jpy/100)) * 100) / 100)
            var vl_back =  Math.round(((data[0].vl_back + fee_back)) * 100) / 100

            rate_model.updateMany({}, {vl_back:vl_back}, (err)=>{
              if(err){
                bot.sendMessage(id_gr_back, "ERR")
              }else{
                var d = new Date();
                var month = d.getMonth()+1
                var day = d.getDate()
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
                var date = "⏰ " + day + "/" + month + "  "+ hours + ":" + mins + "\n\n"

                var from = "Bot\n\n"
                if(chat_id == id_gr_jpy){
                  from = "JPY:\n\n"
                };
                if(chat_id == id_gr_vnd){
                  from = "VND:\n\n"
                };
                var mess1 = amount + " x " + data[0].back_jpy +"% = " + fee_back + " usdt\n\n"
                var mess2 = data[0].vl_back + " + " + fee_back + " = *" + vl_back + "*usdt"
                var mess = date + from + mess1 + mess2
                console.log(111111222)
                bot.sendMessage(id_gr_back, mess,{parse_mode: 'Markdown'});  
              }
            })
          }
      }
    })
  }

  // bot.onText(/\/check/, (msg) => {
  //   var mess  = id_group +"\n"+ to_address +"\n"+ amount
  //   bot.sendMessage(msg.chat.id, mess)
  // })

})
require('./edit_rate_jp_gr')(bot) 
require('./edit_rate_vn')(bot) 
require('./rate_jp1')(bot) 
