const Discord = require('discord.js');
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
   name: "ban",
   async run (client, message, args) {


    if (!["809783259500249099"].some(role => message.member.roles.cache.get(role)) &&

    !message.member.hasPermission("ADMINISTRATOR"))
     return message.channel.send(new Discord.MessageEmbed()
       .setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
       .setColor("0x800d0d")
       .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
       .setTimestamp())
        .then(x => x.delete({ timeout: 5000 }))

        //-----------------------KOD-BAŞLANGIÇ---------------------\\

        let member = message.mentions.users.first()
        let sebep = args.slice(1).join(' ')
        let guild = message.guild;
        let kanal = '809783420346433566'

        if(!member) return message.channel.send("Bir Kullanıcı Etiketlermisin.")

        if(!sebep) return message.channel.send("Bir Sebep Belirtirmisin.")
        

        else
        guild.members.ban(member) // Kullanıcı banlandı


         const banlandı = new Discord.MessageEmbed()
          .setTitle("Bir Üye Banlandı!")
          .setColor("RANDOM")
          .setThumbnail(message.author.avatarURL())
          .addField("Banlayan Yetkili", message.author)
          .addField("Banlanan Üye", member)
          .addField("Sebep", sebep)
          
          client.channels.cache
          .get(kanal)
          .send(banlandı)
       
    }

  }
  