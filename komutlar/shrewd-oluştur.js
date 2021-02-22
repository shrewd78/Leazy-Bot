const Discord = require("discord.js");
const Database = require("plasma-db");
const db = new Database("./database.json");

module.exports = {
  name : "oluştur",
  async run (client, message ,args) {

      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanmaya yetkin yok!')

      message.guild.channels.cache.forEach((item, i) => { // Bütün kanalları silen kod
          item.delete(i)
          
      });
       message.guild.channels.create('ተ APHRODİTE CHATS', { type: "category"}).then(chat => {
       message.guild.channels.create("ተ PUBLİC VOİCES", { type: "category"}).then(seskanalları => {

                //Chat Kanalları
                message.guild.channels.create('aphrodite-chat', { type: "text"}).then(sohbet => {
                    sohbet.setParent(chat.id)
                })
                message.guild.channels.create('bot-komut', { type: "text"}).then(sohbet => {
                    sohbet.setParent(chat.id)
                })
                message.guild.channels.create('photo-chat', { type: "text"}).then(sohbet => {
                    sohbet.setParent(chat.id)
                })
                message.guild.channels.create('owo-chat', { type: "text"}).then(sohbet => {
                    sohbet.setParent(chat.id)
                })
                message.guild.channels.create('instagram-chat', { type: "text"}).then(sohbet => {
                    sohbet.setParent(chat.id)
                })
                message.guild.channels.create('spotify-paylaşım', { type: "text"}).then(sohbet => {
                    sohbet.setParent(chat.id)
                })

                // Ses Kanalları
                message.guild.channels.create('Aphrodite Family', { type: "voice"}).then(sohbet => {
                    sohbet.setParent(seskanalları.id)
                })
                message.guild.channels.create('ተ Melliflouse of Aphrodite', { type: "voice"}).then(sohbet => {
                    sohbet.setParent(seskanalları.id)
                })
                message.guild.channels.create('ተ Girit of Aphrodite', { type: "voice"}).then(sohbet => {
                    sohbet.setParent(seskanalları.id)
                })
                message.guild.channels.create('ተ Saudade of Aphrodite', { type: "voice"}).then(sohbet => {
                    sohbet.setParent(seskanalları.id)
                })
                message.guild.channels.create('ተ İneffable of Aphrodite', { type: "voice"}).then(sohbet => {
                    sohbet.setParent(seskanalları.id)
                })
                message.guild.channels.create('ተ Sobremessa of Aphrodite', { type: "voice"}).then(sohbet => {
                    sohbet.setParent(seskanalları.id)
                })
                message.guild.channels.create('ተ Destinesia of Aphrodite', { type: "voice"}).then(sohbet => {
                    sohbet.setParent(seskanalları.id)
                })

                message.guild.channels.create('ተ Komerebi of Aphrodite', { type: "voice"}).then(sohbet => {
                    sohbet.setParent(seskanalları.id)
                })  
                message.guild.channels.create('ተ Aphrodite Music¹', { type: "voice"}).then(sohbet => {
                    sohbet.setParent(seskanalları.id)
                })  
                message.guild.channels.create('ተ Aphrodite Music²', { type: "voice"}).then(sohbet => {
                    sohbet.setParent(seskanalları.id)
                })  

            })
       })

       // Roller
       message.guild.roles.create({ data: { name : "Gods of Aphrodite", color: "WHITE"}})
       message.guild.roles.create({ data: { name : "Lucifer", color: "#ff0000", permissions: ["ADMINISTRATOR"]}})
       message.guild.roles.create({ data: { name : "Joker", color: "#00ff17"}})
       message.guild.roles.create({ data: { name : "Developer", color: "#ff36bf"}})
       message.guild.roles.create({ data: { name: "</>", permissions: ["ADMINISTRATOR"]}})
       
       
  }
}   