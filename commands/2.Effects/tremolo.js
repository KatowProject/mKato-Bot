const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {

    //verif dulu
    if (!message.member.voice.channel) return message.channel.send({
        embed: {
            color: client.colors.error,
            description: `${client.emotes.error} | Kamu harus memasuki *Voice Channel* terlebih dahulu!`
        }
    })

    if (!client.player.isPlaying(message.guild.id)) return message.channel.send({
        embed: {
            color: client.colors.error,
            description: `${client.emotes.error} | Tidak ada musik yang diputar!`
        }
    })

    //mainkan tombolnya sterrr
    if (!args[0]) return;
    let on = args[0] === "on"
    let off = args[0] === "off"


    //mulaikan efeknya
    if (on) {
        let channel = client.player.getQueue(message.guild.id)

        channel = client.player.setFilters(message.guild.id, {
            tremolo: true
        });

        message.channel.send("Tremolo telah diaktifkan!");
    } else
        //matikan efeknya
        if (off) {
            let channel = client.player.getQueue(message.guild.id)

            channel = client.player.setFilters(message.guild.id, {
                tremolo: false
            });

            message.channel.send('Tremolo telah dinonaktifkan!')
        };

}

exports.conf = {
    aliases: [],
    cooldown: 5
}

exports.help = {
    name: 'tremolo',
    description: 'menberikan efek tremolo pada musik',
    usage: 'k@tremolo <on/off>',
    example: 'k@tremolo on'
}
