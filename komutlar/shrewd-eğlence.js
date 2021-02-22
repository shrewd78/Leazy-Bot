const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
  name: "eğlence",

  async run (client, message) {

     const embed = new Discord.MessageEmbed()
      .setColor("#00ffeb")
      .setTitle("`Eğlence Menüsü`")
      .setDescription(`Kod Açıklaması: **Bu Kodlar Tamamen Ücretsiz Bir Şekilde Sunucunuzu Yönetmenizi Sağlar**`)
      .addField("» `!yazı-yaz`", "Botunuza yazı yazdırırsınız.")
      .addField("» `!zarat`", "Zar atarsınız.")
      .addField("» `!espri`", "Bot çok soğuk bir espri yapar. [DİKKAT FAZLA SOĞUKTUR]")
      .addField("» `!edit`", "Özel komuttur :d")
      .setTimestamp()
      .setFooter("© 2021 Eğlence Menüsü")
        return message.channel.send(embed);
        
  }

}