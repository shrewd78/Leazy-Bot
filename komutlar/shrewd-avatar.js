const Discord = require("discord.js");

module.exports = {
  name: "avatar",

  async run (client, message ,args) {
    
    const insancık = message.mentions.users.first();

    const avatar = new Discord.MessageEmbed()

     .setColor("RANDOM")
     .setTitle("» İşte avatarınız!")
     .setImage(insancık.avatarURL())
       return message.channel.send(avatar);

  }

}