const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
  name: "yardım",

  async run (client, message) {

     const embed = new Discord.MessageEmbed()
      .setColor("#00ffeb")
      .setTitle("📋 `Yardım Menüsü`")
      .addField("» `!moderasyon`", "Moderasyon menüsünü görüntülersiniz.")
      .addField("» `!eğlence`", "Eğlence menüsünü görüntülersiniz.")
      .addField("» `!guard`", "Guard menüsünü görüntülersiniz.")
      .setTimestamp()
      .setFooter("© 2021 Yardım Menüsü")
        return message.channel.send(embed);
        
  }

}