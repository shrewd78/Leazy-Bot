const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
  name : "sil",

  async run (client, message ,args) {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanmak için yeterli yetkiye sahip değilsin.")

   if(isNaN(args)) return message.reply("Lütfen bir sayı giriniz.")

   if(args < 2 || args > 100) return message.reply("Lütfen 2-100 arası silinecek mesaj belirleyin.")
   message.channel.bulkDelete(Number(args))

     const sil = new Discord.MessageEmbed() 
      .setColor("RANDOM")  
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic : true}))   
      .setDescription(`Başarıyla **${args}** adet mesaj silindi!`)
        return message.channel.send(sil)
        .then(x => x.delete({ timeout: 5000}))
        
     }

  }

