const { GuildMember, MessageEmbed,Client} = require("discord.js");
const acar = client.veri;
module.exports = {
    Isim: "toplu",
    Komut: ["ts"],
    Kullanim: "toplu Oyun odasındaki yönetici dışında kişileri susturur ve açar.",
    Aciklama: "",
    Kategori: "Yönetici",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {
  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    let vkchat = message.guild.channels.cache.get(acar.vkKanallar.vkChat);
   if(!message.member.roles.cache.has(acar.vkRoller.yönetici)) return message.channel.send(`Hata: \`Vampir/Köylü oyununa sonradan gelenleri eklemek için VK Yöneticisi olmalısın.\``).then(sil => sil.delete({timeout: 5000}));
   if(!message.member.voice || message.member.voice.channelID != acar.vkKanallar.vkOyunOdası) return message.channel.send(`Hata: Vampir/Köylü toplu susturma komutunu kullanabilmek için \`${message.guild.channels.cache.get(acar.vkKanallar.vkOyunOdası).name}\` kanalında bulunmalısın!`).then(x => x.delete({timeout: 7500}));
   if(args[0] !== "sustur" && args[0] !== "susturma") return message.channel.send("Hata: `Lütfen argümanları doldurun!` **Örn: vk!toplu sustur/susturma**").then(x => x.delete({timeout: 7500}));
   if(args[0] == "sustur") {
    let toplumute = message.member.voice.channel.members.filter(member => !member.roles.cache.has(acar.vkRoller.yönetici));
    toplumute.array().forEach((x, index) => setTimeout(() => { x.voice.setMute(true) }, 1500));
    message.react('✅')
   };
   if(args[0] == "susturma") {
    let toplumute = message.member.voice.channel.members.filter(member => !member.roles.cache.has(acar.vkRoller.yönetici) && !member.roles.cache.has(acar.vkRoller.ölü));
    toplumute.array().forEach((x, index) => setTimeout(() => { x.voice.setMute(false) }, 2000));
    message.react('✅')
   };
     }
};

