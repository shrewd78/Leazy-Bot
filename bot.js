const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json") 
const Database = require("plasma-db");
const db = new Database("./database.json"); 
const moment = require('moment');
require("moment-duration-format");
const path = require("path"); 
const snekfetch = require("snekfetch"); 
const ms = require("ms"); 
const tags = require("common-tags");
var Jimp = require("jimp"); 
const fs = require('fs');
const { readdirSync } = require('fs');
const { join } = require('path');

var prefix = ayarlar.prefix;

client.commands= new Discord.Collection();

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); 

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    client.commands.set(command.name, command); 
}

client.on("error", console.error);


client.on('ready', () => {
    console.log("------------------------------------------------")
    console.log(`${client.commands.size} Tane komut yüklendi`)
    console.log ('Botunuz başarıyla aktif oldu!')
    console.log("------------------------------------------------")
    
    // Botun durumu
    const durumlar = [
      "V12 Leazy Bot",
      "!yardım | Yazarak Yardım Menüsünü Görebilirsiniz!",
      "!moderasyon | Yazarak Moderasyon Komutlarını Görebilirsiniz!!!",
      "!eğlence | Yazarak Eğlence Komutlarını Görebilirsiniz!!!",
      
      
      `${client.guilds.cache.size} Tane Sunucuya Hizmet Ediyorum!`,
      `${client.users.cache.size} Tane Kullanıcı!`,
    ]
    setInterval(function () {
     let durum = durumlar[Math.floor(Math.random()*durumlar.length)]
     client.user.setActivity(durum)

    }, 5000);

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
   return message.channel.send("**Merhaba Hoşgeldin!**")
});

client.on("guildMemberAdd", member => {
    const giris = member.guild.channels.cache.find(giris => giris.id === "813855738321436747");

    const embed = new Discord.MessageEmbed()
    .setDescription(`${member} Sunucumuza Hoşgeldin Umarım Keyifli Vakit Geçirirsin <:sar:813423734068477952>`)
     giris.send(embed)
  });

client.on("guildMemberRemove", member => {
    const cikis = member.guild.channels.cache.find(cikis => cikis.id === "813855738321436747");
    
    const embed2 = new Discord.MessageEmbed()
    .setDescription(`${member} Sunucumuzdan Ayrıldı Acaba Neyini Sevmedide Ayrıldı..<:788066661495472188:813425084760326244>`)
     cikis.send(embed2)
   });

client.on("guildMemberAdd", member => {
    let rol = member.guild.roles.cache.find(role => role.id === "809783292492513306");
    member.roles.add(rol);
  });

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

       const channel = client.channels.cache.find(c => c.id === "813167847492681739")
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

      const channel = client.channels.cache.find(c => c.id === "813167847492681739")
      channel.send(embed4)
 });

  //----------------------------------------------------MESSAGE-LOG----------------------------------------------------\\

  client.on("messageDelete", function (message) { // 1 parametre alıyor

   let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
    .setDescription(`
    
      **Mesajı Silen Kişi:**
      > <@${message.author.id}>
      **Silinen Mesaj**
      > ${message.content}`)

      .setTimestamp()
      .setColor("#ff000")
      .setFooter("Kullanıcı: " + message.author.username + " | Sunucu " + message.guild.name);

      client.channels.cache
      .get(ayarlar.kanal)
      .send(embed)
  });

  client.on("messageUpdate", function (oldMsg, newMsg) { // 2 parametre alıyor
    
    if(newMsg.author.bot) return;

    let embed = new Discord.MessageEmbed()
     .setAuthor(newMsg.author.tag, newMsg.author.avatarURL({ dynamic: true }))
     .setDescription(`
     
      **Mesaj Sahibi**
      > <@${newMsg.author.id}>
      **Mesaj Linki**
      > [Tıkla](${newMsg.url})
      **Eski Mesaj**
      > ${oldMsg.content}
      **Yeni Mesaj**
      > ${newMsg.content}`)

      .setTimestamp()
      .setColor("#ff000")
      .setFooter("Kullanıcı: " + newMsg.author.username + " | Sunucu: " + newMsg.guild.name)

      client.channels.cache
       .get(ayarlar.kanal)
       .send(embed)
  });

  //----------------------------------------------------MESSAGE-LOG-SON----------------------------------------------------\\

 //----------------------------------------------------BOTU-SESE-SOKMA----------------------------------------------------\\

  client.on("ready", async function () {
    const voiceChannel = "809783390760075277";
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

//--------------------------------TAG-ALINCA-VERİLEN-ROL------------------------------------------------------\\

client.on("userUpdate", async (oldUser, newUser) => {
   if(oldUser.username !== newUser.username) {

     let tag = "Desiré"; // Tagınız
     let sunucu = "809780107891703888"; // Sunucu ID
     let kanal = "809783388042821692"; // Kanal ID
     let rol = "809783284174815242"; // Tag aldıktan sonra verilecek rol ID


     if(newUser.username.includes(tag) && !client.guilds.cache 
       .get(sunucu)
       .members.cache.get(newUser.id)
       .roles.cache.has(rol)) {


        client.channels.cache
        .get(kanal)
        .send(`${newUser} **\`${tag}\`** tagını aldığı için <@&${rol}> rolünü kazandı!`)

        client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.add(rol)

       }

    if(!newUser.username.includes(tag) && client.guilds.cache 
       .get(sunucu)
       .members.cache.get(newUser.id)
       .roles.cache.has(rol)) {


        client.channels.cache
        .get(kanal)
        .send(`${newUser} **\`${tag}\`** tagını isminden çıkardığı için <@&${rol}> rolünü kaybetti!`)
        
        client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.remove(rol)

    }   
  }
});

// codder: shréwd

//--------------------------------TAG-ALINCA-VERİLEN-ROL------------------------------------------------------\\
