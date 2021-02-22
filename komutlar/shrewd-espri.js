const Discord = require("discord.js");

module.exports = {
 name: "espri",

 async run (client, message, args) {

   var espri = ["Bacaktaki 10' a ne denir? \n **Pantolon**", "Yıkanan ton balığına ne denir? \n **Washington**","Gülen ördeğe ne denir? \n **Kıkır-duck**","Örümcek adam ağ atamıyormuş neden? \n **ÇÜNKÜ AĞ BAĞLANTISI KOPMUŞ.**","En çok eşek yavrusu nerde bulunur? \n **SPA MERKEZİNDE**","Kırmızı giyen erkeğe ne denir? \n **ALBAY**","İneklerin sevmediği element? \n **AZ-OT**","Dört tarafı suyla çevrili çaya ne denir? \n **ADAÇAYI**", "Pişmemiş burgere ne denir?\n**HAMBURGER**"];
  
   var esrpiler = espri[Math.floor(Math.random()* espri.length)];
    return message.channel.send(`${esrpiler}`);

  }

}