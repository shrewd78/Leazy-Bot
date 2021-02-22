const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
  name: "kick",

  async run (client, message, args) {

    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.reply(`Bu yetkiyi kullanabilmek için **Kullanıcıları At** yetkisine sahip olmak zorundasın.`);


      let kisi = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      let sebep = args.slice(1).join(' ');

      if(!kisi) return message.reply("Kickleyeceğin kişiyi belirtirmisin?")
      .then(x => x.delete({ timeout: 5000}))

      if(!sebep) return message.reply("Sebebini belirtirmisin?")

      if(!message.guild.member(kisi).kickable)
        return message.reply("Bu kişiyi kickleyemezsin!")

         message.guild.member(kisi).kick(sebep);


          const kanal = message.guild.channels.cache.find(kanal => kanal.id === "812440172461162556")
          
          const kickkrdsm = new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
           .addField("Kicklenen kişi ve sebebi", `Kicklenen üye  **${kisi}** kicklenme sebebi **${sebep}**`)
           .setTimestamp()
           .setFooter("© 2021 Leazy Bot")
             kanal.send(kickkrdsm);
  }

}