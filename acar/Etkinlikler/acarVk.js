const { GuildMember, MessageEmbed,Client} = require("discord.js");
const moment = require('moment');
const fs = require('fs');
const qdb = require(`quick.db`)
const acar = client.veri;
module.exports = {
    Etkinlik: "voiceStateUpdate",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
    
    },
    /**
     * @param {client} ready
     */
    onRequest: async function (oldState, newState, newMember, oldMember) {
        if((!oldState.channel && newState.channel) || (oldState.channel && newState.channel)){    // Bug önleme 
        const oldUserChannel = oldState.channelID;
        const newUserChannel = newState.channelID;
        const uye = newState.guild.members.cache.get(newState.id)
        let oyunbilgi = qdb.fetch(`vkoyunu`);
        if(oyunbilgi === "aktif") {
            if (newUserChannel === acar.vkKanallar.vkOyunOdası) {
                if(uye.hasPermission('ADMINISTRATOR')) return;
                if(uye.roles.cache.has(acar.vkRoller.yönetici)) return;
                if(uye.roles.cache.has(acar.vkRoller.katıldı)) return;
             // uye.voice.setChannel(acar.vkKanallar.vkBekleme);
            };
        if (newUserChannel === acar.vkKanallar.vkOyunOdası) {
           return;
          } else {
            if(oldUserChannel === acar.vkKanallar.vkOyunOdası) {
                if(uye.voice.channel) uye.voice.setMute(false);
                if(uye.roles.cache.has(acar.vkRoller.katıldı)) uye.roles.remove(acar.vkRoller.katıldı);
                if(uye.roles.cache.has(acar.vkRoller.doktor)) uye.roles.remove(acar.vkRoller.doktor);
                if(uye.roles.cache.has(acar.vkRoller.ölü)) uye.roles.remove(acar.vkRoller.ölü);
            } else {
                return;
            }
          }
        }  else if(oyunbilgi === "deaktif") {
            return;
        } else {
            return;
        }
    }
    }
  };