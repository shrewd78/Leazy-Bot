const Discord = require("discord.js");

module.exports = {    
 name : "yazı-yaz",
 async run (client, message, args, bot) {

  let yazı = args.slice(0).join(' ')

   if(!yazı) return message.channel.send("**Lütfen yazı yazarmısın?**")
    else {
        return message.channel.send(yazı)
    }
 }
 
}   