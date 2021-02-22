const Discord = require("discord.js");
const moment = require("moment")
require("moment-duration-format")
const os = require("os");

module.exports = {
  name: "istatistik",

  async run (client, message) {
   
    const uptime = moment.duration(client.uptime).format("D [gün], H [saat], m [dakika], s [saniye]")
    const embed = new Discord.MessageEmbed()
     .setColor("#ff36bf")
     .setTitle('📖 Leazy Bot İstatistik')
     .addField('» Kullanıcılar', client.users.cache.size)
     .addField('» Sunucular', client.guilds.cache.size)
     .addField('» Kanallar', client.channels.cache.size)
     .addField('» Çalışma Süresi', uptime)
     .addField('» Node.js Versiyon', process.version)
     .addField('» Discord.js Versiyon', Discord.version)
     .addField('» Ram Kullanımı', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))
     .addField('» CPU', os.cpus().map(i => i.model)[0])
     .addField('» İşletim Sistemi', os.platform())
     .setFooter('© 2021 Leazy Bot')
     .setTimestamp()
       return message.channel.send(embed);
 
  }

}