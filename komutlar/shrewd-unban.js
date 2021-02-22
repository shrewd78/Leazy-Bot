const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
  name : "unban",

  async run (client, message ,args) {
   
    
     if (!["809783259500249099"].some(role => message.member.roles.cache.get(role)) &&

     !message.member.hasPermission("ADMINISTRATOR")) 
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
        .setColor("0x800d0d")
        .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
        .setTimestamp())
         .then(x => x.delete({ timeout: 5000 }));

         //-----------------------KOD-BAŞLANGIÇ---------------------\\

         let member = args[0]
         let guild = message.guild;
         let kanal = '809783420346433566'

         if(!member) return message.channel.send("Banını Kaldıracağın Kişinin ID'sini Yazarmısın.")
         

         else
         guild.members.unban(member) // Kullanıcının banı kalktı

         
          const kaldırıldı = new Discord.MessageEmbed()
           .setTitle("Bir Üyenin Banı Kalktı!")
           .setColor("RANDOM")
           .setThumbnail(message.author.avatarURL())
           .addField("Banı Kaldıran Yetkili", message.author)
           .addField("Banı Kaldırılan Üye", member)
          
           client.channels.cache
           .get(kanal)
           .send(kaldırıldı)  

  }

}