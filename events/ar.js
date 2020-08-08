const { MessageEmbed } = require('discord.js')

module.exports = async (client, message) => {

    const embed = new MessageEmbed()
        .setColor('#985ce7')
        .setDescription(`Hai ${message.author}, Prefix aku adalah **${client.config.prefix}** dan **${client.config.prefix2}** ヾ(≧▽≦*)o`)
    //message
    const ar = {
        kato_mobile: `<@${client.user.id}>`,
        kato_pc: `<@!${client.user.id}>`
    }
    //link
    const link = {
        ping_kato: 'https://cdn.discordapp.com/attachments/519859252966457369/702365347721773116/kato_ping.gif',
    }

    //trigger 
    if (message.content.toLowerCase() === ar.kato_pc) {// Ar jika mention Kato
        message.channel.send(embed).then(t => t.delete({ timeout: 15000 })
        )
    } else {
        if (message.content.toLowerCase() === ar.kato_mobile) {
            message.channel.send(embed).then(t => t.delete({ timeout: 15000 }))
        }
    }


}