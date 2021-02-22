const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
  name: "moderasyon",

  async run (client, message, args) {
  
    const mod = new Discord.MessageEmbed()
     .setColor("#00ffeb")
     .setTitle("`Moderasyon Menüsü`")
     .setDescription(`Kod Açıklaması: **Bu Kodlar Tamamen Ücretsiz Bir Şekilde Sunucunuzu Yönetmenizi Sağlar**`)
     .addField("» `!ban`", "Kullanıcıyı sunucudan yasaklarsınız.")
     .addField("» `!unban`", "Kullanıcının sunucudaki banını açarsınız.")
     .addField("» `!kick`", "Etiketlediğiniz üyeyi sunucudan atarsınız.")
     .addField("» `!uyar`", "Uyarılacak kullanıcının özel mesajına uyarı mesajı gönderirsiniz.")
     .setTimestamp()
     .setFooter("© 2021 Moderasyon Menüsü")
      return message.channel.send(mod);

  }

}