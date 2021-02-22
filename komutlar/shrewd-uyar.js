const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
  name : "uyar",

  async run (client, message ,args) {

    if(!message.member.hasPermission("KICK_MEMBERS")) 
     return message.reply("Bu komutu kullanman için **Kullanıcıları At** yetkisine sahip olman gerekiyor")


     let sunucu = message.guild;
     let uyarılcak = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
     let sebep = args.slice(1).join(' ')


      if(!uyarılcak) return message.channel.send("Uyarcağın bir kullanıcı belirtmedin!")

      if(!sebep) return message.channel.send("Bir sebep belirtirmisin?")

      else 
       message.channel.send("Kişiyi başarıyla uyardım, Özel mesajına uyarı mesajı gönderdim!")
        uyarılcak.send(`**${sunucu}** Sunucusunda **${sebep}** sebebiyle uyarıldın. Lütfen bir daha tekrarlama!`)

  }

}   