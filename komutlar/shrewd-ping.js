const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
  name: "ping",

  async run (client, message) {
     
      let ping = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .addField("**__Gecikme Sürem__**, ", `**${client.ws.ping}** ms olarak hesaplandı.`, true);
         return message.channel.send(ping)
         .then(x => x.delete({ timeout: 5000}))

  }

}