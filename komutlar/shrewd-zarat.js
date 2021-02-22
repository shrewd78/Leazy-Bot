const Discord = require('discord.js');

module.exports = {
   name: "zarat",

   async run (client, message ,args) {

      message.channel.send(new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('🎲 Zarın: ' + doMagicDiceVoodoo()));


         function doMagicDiceVoodoo () {

         var zar = ["1", "2", "3", "4", "5", "6"];

         return zar[Math.floor(Math.random()* zar.length)];
         
      }
   

   }

}