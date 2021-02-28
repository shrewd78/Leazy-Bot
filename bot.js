const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json") 
const Database = require("plasma-db");
const db = new Database("./database.json"); 
const moment = require('moment');
require("moment-duration-format");
const snekfetch = require("snekfetch"); 
const ms = require("ms"); 
const tags = require("common-tags");
var Jimp = require("jimp"); 
const { readdirSync } = require('fs');
const { join } = require('path');

var prefix = ayarlar.prefix;

client.commands= new Discord.Collection();

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); 

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
      if(typeof command.name === "object"){
       command.name.forEach(x => {
         client.commands.set(x, command)
       })
      } else {
        client.commands.set(command.name, command)
      }
    }

client.on("error", console.error);


client.on('ready', () => {
    console.log("------------------------------------------------")
    console.log(`${client.commands.size} Tane komut yüklendi`)
    console.log ('Botunuz başarıyla aktif oldu!')
    console.log("------------------------------------------------")
    
    // Botun durumu
    const durumlar = [
      "!davet Diyerek Beni Sunucuna Davet Edebilirsin.",
      "!yardım | !moderasyon | !eğlence | !kullanıcı",
      "🤖 Developed by Shréwd",
      "Güle Güle Kullanın..🤍",
      
      `${client.guilds.cache.size} Tane Sunucuya Hizmet Ediyorum!`,
      `${client.users.cache.size} Tane Kullanıcı!`,
    ]
    setInterval(function () {
     let durum = durumlar[Math.floor(Math.random()*durumlar.length)]
     client.user.setActivity(durum)

    }, 5000); // 5 saniye

});   

client.on("message", message => { // Eğer üye sayısı 5 ten küçük olan sunucudaysa bot otomatik ayrılcak
   if(message.content === "ayrıl") {
     client.guilds.cache.forEach((item, i) => {
       if(item.memberCount < 5) {
         item.leave()
 
       } else {
         return
       }
     });
   }
})  

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return message.channel.send(`Komut dosyamda **${command}** adlı bir komut bulamadım.`)

        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login(ayarlar.token);

//----------------------------------------------------KOMUTLAR----------------------------------------------------\\

client.on("message", message => {
  if(message.content.toLowerCase() === "Merhaba")
   return message.channel.send("Merhaba Hoşgeldin!")
});

client.on("guildMemberAdd", member => {
    const giris = member.guild.channels.cache.find(giris => giris.id === "KANAL ID");

    const embed = new Discord.MessageEmbed()
    .setDescription(`${member} Sunucumuza Hoşgeldin Umarım Keyifli Vakit Geçirirsin <:sar:813423734068477952>`)
     giris.send(embed)
  });

client.on("guildMemberRemove", member => {
    const cikis = member.guild.channels.cache.find(cikis => cikis.id === "KANAL ID");
    
    const embed2 = new Discord.MessageEmbed()
    .setDescription(`${member} Sunucumuzdan Ayrıldı Acaba Neyini Sevmedide Ayrıldı..<:788066661495472188:813425084760326244>`)
     cikis.send(embed2)
   });
   
client.on("guildMemberAdd", member => {
   let rol = member.guild.roles.cache.find(role => role.id === "814147299244376084")
   member.roles.add(rol)

})

client.on("guildCreate", async guild => {
     
     const embed1 = new Discord.MessageEmbed()
      .setTitle("Sunucunuza Eklediğiniz İçin Teşekkürler! 🥳")
      .setDescription('Sunucu adı : `' + guild.name + '`')

      const embed2 = new Discord.MessageEmbed()
       .setTitle("Yeni Bir Sunucuya Katıldım!")
       .setDescription('Sunucu adı :' + guild.name)
       .addField('Kullanıcı Sayısı', guild.memberCount)
       .addField('Sunucu Bölgesi', guild.region)
       .addField('Sunucu Sahibi', guild.owner)
       guild.owner.send(embed1)

       const channel = client.channels.cache.find(c => c.id === "814186310104907776")
       channel.send(embed2)
  });

 client.on("guildDelete", async guild => {
     
    const embed3 = new Discord.MessageEmbed()
     .setTitle("Sunucunuzdan Çıkardığınız İçin Üzgünüz 🥺")
     .setDescription('Sunucu adı : `' + guild.name + '`')

     const embed4 = new Discord.MessageEmbed()
      .setTitle("Bir Sunucudan Çıktım!")
      .setDescription('Sunucu adı :' + guild.name)
      .addField('Kullanıcı Sayısı', guild.memberCount)
      .addField('Sunucu Bölgesi', guild.region)
      .addField('Sunucu Sahibi', guild.owner)
      guild.owner.send(embed3)

      const channel = client.channels.cache.find(c => c.id === "814186310104907776")
      channel.send(embed4)
 });

  //----------------------------------------------------MESSAGE-LOG----------------------------------------------------\\

  client.on("messageDelete", function (message) { // tek parametre

   if(message.author.bot) return;

    let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
     .addField("Mesajı Silen Kişi", message.author.id)
     .addField("Silinen Mesaj", message.content)
     .setColor("#ff000")
     .setTimestamp()
     .setFooter("Kullanıcı: " + message.author.username + " | Sunucu: " + message.guild.name)

     client.channels.cache
     .get(ayarlar.kanal)
     .send(embed)

  });

  client.on("messageUpdate", function (oldMsg, newMsg) { // çift parametre

    if(newMsg.author.bot) return;

    let embed = new Discord.MessageEmbed()
     .setAuthor(newMsg.author.tag, newMsg.author.avatarURL({ dynamic: true }))
     .addField("Mesaj Sahibi", newMsg.author.id)
     .addField("Eski Mesaj", oldMsg.content)
     .addField("Mesaj Linki", `[Tıkla](${newMsg.url})`)
     .addField("Yeni Mesaj", newMsg.content)
     .setColor("#ff000")
     .setTimestamp()
     .setFooter("Kullanıcı: " + newMsg.author.username + " | Sunucu: " + newMsg.guild.name)
     
     client.channels.cache
     .get(ayarlar.kanal)
     .send(embed)

  });
  
  //----------------------------------------------------MESSAGE-LOG-SON----------------------------------------------------\\

 //----------------------------------------------------BOTU-SESE-SOKMA----------------------------------------------------\\

  client.on("ready", async function () {
    const voiceChannel = ayarlar.botses;
     client.channels.cache
      .get(voiceChannel)
      .join()
      .catch(err => {
         throw err;
      });
  });

  //----------------------------------------------------BOTU-SESE-SOKMA----------------------------------------------------\\

  //----------------------------------------------------ROL-KORUMA----------------------------------------------------\\

  client.on("roleDelete", async role => {

   const entry = await role.guild
   .fetchAuditLogs({ type: "ROLE_DELETE"})
   .then(audit => audit.entries.first());

    if(entry.executor.id === client.user.id) return;

    if(ayarlar.korumakanal) {
     const embed = new Discord.MessageEmbed()
      .setTitle("Bir Rol Silindi!")
      .addField("Rolü Silen", ">`" + entry.executor.tag + "`")
      .addField("Rolü Silen ID", ">`" + entry.executor.id + "`")
      .addField("Sonuç;", "Silinen Rol Geri Açıldı")
      .setThumbnail(entry.executor.avatarURL())
      .setFooter(role.guild.name, role.guild.iconURL())
      .setColor("RED")
      .setTimestamp()

      // Kanala Gönderen Ve İşlem Yapılan Yer
     client.channels.cache
      .get(ayarlar.korumakanal)
      .send(embed)
      .then(role.guild.roles.create ({
         data: {
         name: role.name,
         color: role.color,
         hoist: role.hoist,
         permissions: role.permissions,
         mentionable: role.mentionable,
         position: role.position

         },
         reason: "Silinen Rol Geri Açıldı."

      })
      
    );
  }

});

  //----------------------------------------------------ROL-KORUMA----------------------------------------------------\\

  //----------------------------------------------------KANAL-KORUMA----------------------------------------------------\\

  client.on("channelDelete", async function (channel) {
    let chnnl = await db.fetch(`kanalaq_${channel.guild.id}`);
  
  if (chnnl) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  // İşlem Yapılan Yer
  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  } 
})

//----------------------------------------------------KANAL-KORUMA----------------------------------------------------\\

//------------------------------------------------------REKLAM-ENGEL------------------------------------------------------\\

client.on("message", message => { // Shréwd
  if(!db.var(`reklamcik_${message.guild.id}`)) return;

   const reklamcık = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    "net",
    ".rf.gd",
    ".az",
    ".party",
    "discord.gg"
   ];

   if(reklamcık.some(kelime => message.content.toLowerCase().includes(kelime))) {
    try {

      if(!message.member.hasPermission("ADMINISTRATOR")) { // bu yetkiye sahip olanları etkilemiyor
       message.delete();

        return message.channel.send(new Discord.MessageEmbed()
         .setDescription(`${message.author} Bu sunucuda reklam yapmak yasaktır!`)
         .setColor("RED")
         .setAuthor(message.member.displayName, message.author.avatarURL())
         .setTimestamp())
         .then(x => x.delete({ timeout: 5000 }));  

     }
   } catch (err) {
           console.log(err);
        }
   }
}); // Shréwd

//------------------------------------------------------REKLAM-ENGEL------------------------------------------------------\\

//------------------------------------------------------KÜFÜR-ENGEL------------------------------------------------------\\

client.on("message", message => { // Shréwd
  if(!db.var(`kufurcum_${message.guild.id}`)) return;
  
   const kufurcuk = ["orospu","amık","Oç","0ç","yavşak","y3a3rram","a.m.k","A.M.K","or1spu","anan1 s1k1m","orospu evladı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","ağzına sıçim","ağzına sıçayım","ağzına s","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amcıklar","amq","amındaki","amnskm","ananı","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","bitch","yarrak","cibiliyetini","bokbok","bombok","dallama","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","porno","sikiş","s1kerim","puşt","sakso","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym","amk","mk","oç"];
   
   if(kufurcuk.some(kelimeğ => message.content.toLowerCase().includes(kelimeğ))) {
    try {

       if(!message.member.hasPermission("ADMINISTRATOR")) { // bu yetkiye sahip olanları etkilemiyor
        message.delete();

         return message.channel.send(new Discord.MessageEmbed()
          .setDescription(`${message.author} Bu sunucuda küfür etmek yasaktır!`)
          .setColor("RED")
          .setAuthor(message.member.displayName, message.author.avatarURL())
          .setTimestamp())
          .then(x => x.delete({ timeout: 5000}))

        }
      } catch (err) {
              console.log(err);
           }
      }
   }); // Shréwd
   
   //------------------------------------------------------KÜFÜR-ENGEL------------------------------------------------------\\
