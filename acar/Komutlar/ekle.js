const { GuildMember, MessageEmbed,Client} = require("discord.js");
const acar = client.veri;
module.exports = {
    Isim: "ekle",
    Komut: ["ekle"],
    Kullanim: "",
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
    message.delete()
    let vkchat = message.guild.channels.cache.get(acar.vkKanallar.vkChat);
   if(!message.member.roles.cache.has(acar.vkRoller.yönetici)) return message.channel.send(`Hata: \`Vampir/Köylü oyununa sonradan gelenleri eklemek için VK Yöneticisi olmalısın.\``).then(sil => sil.delete({timeout: 5000}));
   if(!message.member.voice || message.member.voice.channelID != acar.vkKanallar.vkOyunOdası) return message.channel.send(`Hata: Vampir/Köylü sonradan gelenleri eklemek için \`${message.guild.channels.cache.get(acar.vkKanallar.vkOyunOdası).name}\` kanalında bulunmalısın!`).then(x => x.delete({timeout: 7500}));
   let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(acar.vkRoller.katıldı) && !member.roles.cache.has(acar.vkRoller.yönetici) && !member.voice.channelID != acar.vkKanallar.vkOyunOdası && !member.user.bot)
   verildi.array().forEach((member, index) => {
   setTimeout(() => {
        member.roles.add(acar.vkRoller.katıldı).catch();
    }, index * 1000)
   });
   //let toplumute = message.member.voice.channel.members.filter(member => !member.roles.cache.has(acar.vkRoller.yönetici));
  // toplumute.array().forEach((x, index) => setTimeout(() => { x.voice.setMute(true) }, 1000));
   vkchat.send(`**${verildi.size}** kişi sonradan geldiği için Oyuna katıldı rolü verildi ve susturuldu.`).then(mesajsil => mesajsil.delete({timeout: 7500}));
     }
};

