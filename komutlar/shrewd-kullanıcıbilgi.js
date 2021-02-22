const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "kullanıcıbilgi",

  async run (client, message, args) {

     let üye = message.mentions.users.first()
     if(üye) {

        let durum = üye.presence.status

        .replace('online', 'Çevrimiçi')
        .replace('dnd', 'Rahatsız Etmeyin')
        .replace('idle', 'Boşta')
        .replace('offline', 'Çevrimdışı')

        const embed = new Discord.MessageEmbed()
         .setThumbnail(üye.displayAvatarURL({ dynamic: true}))
         .setColor("GREEN")
         .setTitle(üye.username)
         .setDescription(üye.tag + `**Kişisinin Bilgileri**:\n\n**Kullanıcı Adı:** ${üye.username}\n**Etiket:** ${üye.discriminator}\n**ID:** ${üye.id}\n**Son Mesaj** ${üye.lastMessage}\n**Son Mesaj ID:** ${üye.lastMessageID}\n**Bot mu?** ${üye.bot ? 'Evet' : 'Hayır'}\n**Kullanıcı Aktivitesi:** ${üye.presence.activities[0]}\n**Üye Durumu:** ${durum}\n**Kuruluş Tarihi:** ${moment(üye.createdAt).format('DD')}${moment(üye.createdAt).format('MM')}/${moment(üye.createdAt).format('YY HH:mm:ss')}\n**Roller:** 
          ${message.guild.members.cache.get(üye.id).roles.cache.filter(r => r !== '@everyone').map(rol => rol).join(' | ')}`)
           return message.channel.send(embed)
     } else {

      üye = message.author

      let durum = üye.presence.status

        .replace('online', 'Çevrimiçi')
        .replace('dnd', 'Rahatsız Etmeyin')
        .replace('idle', 'Boşta')
        .replace('offline', 'Çevrimdışı')

        const embed = new Discord.MessageEmbed()
         .setThumbnail(üye.displayAvatarURL({ dynamic: true}))
         .setColor("GREEN")
         .setTitle(üye.username)
         .setDescription(üye.tag + `**Kişisinin Bilgileri**:\n\n**Kullanıcı Adı:** ${üye.username}\n**Etiket:** ${üye.discriminator}\n**ID:** ${üye.id}\n**Son Mesaj** ${üye.lastMessage}\n**Son Mesaj ID:** ${üye.lastMessageID}\n**Bot mu?** ${üye.bot ? 'Evet' : 'Hayır'}\n**Kullanıcı Aktivitesi:** ${üye.presence.activities[0]}\n**Üye Durumu:** ${durum}\n**Kuruluş Tarihi:** ${moment(üye.createdAt).format('DD')}${moment(üye.createdAt).format('MM')}/${moment(üye.createdAt).format('YY HH:mm:ss')}\n**Roller:** 
          ${message.guild.members.cache.get(üye.id).roles.cache.filter(r => r !== '@everyone').map(rol => rol).join(' | ')}`)
           return message.channel.send(embed)
       
     } 

  }
 
}