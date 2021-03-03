const { GuildMember, MessageEmbed,Client} = require("discord.js");
const moment = require('moment');
const fs = require('fs');
module.exports = {
    Etkinlik: "ready",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
    
    },
    /**
     * @param {client} ready
     */
    onRequest: async function () {    
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] Komut dosyaları başarıyla tamamlandı bot aktif edildi.`);
    client.user.setPresence({ activity: { name: "† Knaves Developed by ACAR" }, status: "invincible" });
    }
  };