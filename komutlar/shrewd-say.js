const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
   name: "say",

   async run (clint, message, args) {


   const shrewd = new Discord.MessageEmbed()
   .setColor("RANDOM")
   .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı.`)
   .setTimestamp()


   let tag = ayarlar.tag;
   let tagg = message.guild.members.cache.filter(t => t.user.username.includes(tag)).size;


   let toplam = message.guild.memberCount;


   const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice")
   let count = 0;

   for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;

  const textChannels = message.guild.channels.cache.filter(text => text.type === "text").size;


  let boost = message.guild.premiumSubscriptionCount;


  let embed = shrewd.setDescription(`
  
   **<a:adamsin:813160295790805022> Sunucudaki Üye Sayısı;** ${toplam} \n
   **<a:adamsin:813160295790805022> Taglı Üye Sayısı;** ${tagg} \n
   **<a:adamsin:813160295790805022> Ses Kanallarında Bulunan Kullanıcı Sayısı;** ${count} \n
   **<a:adamsin:813160295790805022> Toplam Bulunan Yazı Kanalları;** ${textChannels} \n
   **<a:adamsin:813160295790805022> Sunucudaki Boost Sayısı;** ${boost}`);
    return message.channel.send(embed);


   }


}