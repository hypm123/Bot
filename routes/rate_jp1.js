module.exports = function(bot){


  var express = require("express");
  var fs = require("fs");
  var app = express();
  var request = require('request-promise');

  bot.onText(/\/rate/, (msg) => {
    const axios = require('axios');
    const API_KEY = '89fb23e3-7193-46af-82c7-1d0e17d4326c';  // Thay thế YOUR_API_KEY bằng API key của bạn
    async function getUSDTJPYExchangeRate() {
        const headers = {
            'X-CMC_PRO_API_KEY': API_KEY,
            'Accept': 'application/json'
        };
        try {
            const endpoint = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=JPY&limit=2000';
            const response = await axios.get(endpoint, { headers: headers });
            const cryptos = response.data.data;

            for (let crypto of cryptos) {
                if (crypto.symbol === 'USDT') {
                  const rate = crypto.quote.JPY.price;
                  //toFixed(2)
                  var rate_high = (Number(rate) + Number(rate)*1.35/100).toFixed(2)
                  var rate_low = (Number(rate) + Number(rate)*1.35/100 - 2.2).toFixed(2)
                  var mess = rate_high + "\n" + rate_low
                  bot.sendMessage(msg.chat.id, mess)
                }
            }
        } catch (error) {
            console.error("Lỗi khi lấy tỉ giá:", error);
        }
    }

    getUSDTJPYExchangeRate();
      
    
  })

}