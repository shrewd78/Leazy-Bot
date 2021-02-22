const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");
const ayarlar = require("../ayarlar.json"); 

let prefix = ayarlar.prefix;

module.exports = {
  name: "kanal-koruma",

  async run (client, message, args) {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanmak için yeterli yetkiye sahip değilsin.")

     if(!args[0]) {

        const arıon = new Discord.MessageEmbed() 
         .setDescription(`Bunumu arıyorsun yoksa? -> **${prefix}kanal-koruma aç/kapat**`)
         .setTimestamp()
          return message.channel.send(arıon)

     }

     if(args[0] === "aç") {

       db.ayarla(`kanalaq_${message.guild.id}`, "Aktif")

         const aktif = new Discord.MessageEmbed()
         .setDescription(`Kanal Korumayı Başarıyla Açtın!<a:yokabi:813347723285626891>`)
         .setTimestamp( )
          return message.channel.send(aktif)
     }  

     if(args[0] === "kapat") {

       db.sil(`kanalaq_${message.guild.id}`, "Deaktif")

        const deaktif = new Discord.MessageEmbed()
         .setDescription(`Kanal Korumayı Başarıyla Kapadın!<a:yokabi:813347723285626891>`)
         .setTimestamp()
          return message.channel.send(deaktif)
     }

  }

}

// shréwd