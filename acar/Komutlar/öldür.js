const { GuildMember, MessageEmbed,Client} = require("discord.js");
const acar = client.veri;
module.exports = {
    Isim: "öldür",
    Komut: ["öldür"],
    Kullanim: "öldür Komutu ile Vampirin belirlediği üyeyi öldürürsün.",
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
    if(!message.member.voice || message.member.voice.channelID != acar.vkKanallar.vkOyunOdası) return message.channel.send(`Hata: Vampir/Köylü komutlarını kullanbilmek için seste \`${message.guild.channels.cache.get(acar.vkKanallar.vkOyunOdası).name}\` kanalında bulunmalısın!`).then(x => x.delete({timeout: 7500}));
    if(!message.member.roles.cache.has(acar.vkRoller.yönetici)) return message.channel.send(`Hata: \`Öldürme işlemi yapabilmek için Vampir veya Yönetici olmalısın.\``).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen vampirin öldürmek istediği kişiyi etiketle!  __Örn:__  \`${client.sistem.a_Prefix}öldür @acar/ID\``).then(sil => sil.delete({timeout: 5000}));
    if(!uye.roles.cache.has(acar.vkRoller.katıldı)) return message.channel.send(`Hata: \`Bu üye oyuna katılmadığından dolayı öldüremezsin.\``);
    if(uye.roles.cache.has(acar.vkRoller.ölü)) return message.channel.send(`Hata: \`bu üye zaten öldürülmüş daha neden öldürüyorsun ki?\``);
    if(uye.voice.channel) uye.voice.setMute(true).catch();
    uye.roles.add(acar.vkRoller.ölü)
    vkchat.send(`${uye} isimli kişi **Vampir** tarafından öldürüldü.`).catch().then(vkchat => vkchat.react('✅'))
     }
};

