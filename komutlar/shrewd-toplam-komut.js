const Discord = require("discord.js");

module.exports = {
  name: "toplam-komut",

  async run (client, message ,args) {

    const toplamkomutkanka = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle("Toplam Komut")
     .setDescription(`Bottaki toplam komut sayısı **${client.commands.size}**`)
       return message.channel.send(toplamkomutkanka);

  }
  
}