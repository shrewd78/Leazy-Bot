const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
  name: "guard",
  
  async run (client, message, args) {

     const guard = new Discord.MessageEmbed()
     .setColor("#00ffeb")
     .setTitle("<a:evet:813353145190711328> `Guard Menüsü`")
     .setDescription(`Kod Açıklaması: **Bu Kodlar Tamamen Ücretsiz Bir Şekilde Sunucunuzu Yönetmenizi Sağlar**`)
     .addField("» `!kanal-koruma`", "Kanal korumayı açar kapatırsınız. **Örnek;** **!kanal-koruma aç/kapat**")
     .setTimestamp()
     .setFooter("© 2021 Guard Menüsü")
       return message.channel.send(guard);
       
 }

}