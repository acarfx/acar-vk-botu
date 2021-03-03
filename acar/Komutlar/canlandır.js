const { GuildMember, MessageEmbed,Client} = require("discord.js");
const acar = client.veri;
const ms2 = require('parse-ms');
const qdb = require('quick.db')
module.exports = {
    Isim: "canlandır",
    Komut: ["dcanlandır"],
    Kullanim: "canlandır <@acar/ID> Ölü üyeyi bir kereliğine canlandırırsın.",
    Aciklama: "",
    Kategori: "Doktor",
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
    if(!message.member.roles.cache.has(acar.vkRoller.doktor) && !message.member.roles.cache.has(acar.vkRoller.yönetici)) return message.channel.send(`Hata: \`Canlandırma işlemi yapabilmek için oyun içerisinde doktor olmalısın!\``).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen canlandırmak istediğin üyeyi seç!  __Örn:__  \`${client.sistem.a_Prefix}canlandır @acar/ID\``).then(sil => sil.delete({timeout: 5000}));
    if(!uye.roles.cache.has(acar.vkRoller.katıldı)) return message.channel.send(`Hata: \`Bu üye oyuna katılmadığından dolayı canlandırmazsınız.\``);
    if(!uye.roles.cache.has(acar.vkRoller.ölü)) return message.channel.send(`Hata: \`bu üye zaten canlı daha neden canlandırıyorsun?\``);
    let canlandırma = qdb.fetch(`canlandirma`)
    if(canlandırma === 'aktif') {
        if(uye.voice.channel) uye.voice.setMute(false).catch();
        uye.roles.remove(acar.vkRoller.ölü)
        vkchat.send(`${uye} isimli kişi **Doktor** tarafından canlandırıldı.`).catch().then(vkchat => vkchat.react('✅'))
        qdb.set(`canlandirma`, `deaktif`);
    } else if(canlandırma === 'deaktif') {
        message.channel.send(`Hata: \`Sadece bir kere canlandırma işlemi yapabilirsin!\``).then(x => x.delete({timeout: 7500}));
    } else {
        message.channel.send(`Hata(S): \`Sadece bir kere canlandırma işlemi yapabilirsin!\``).then(x => x.delete({timeout: 7500}));
    };

     }
};

