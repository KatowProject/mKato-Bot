const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {

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

    const bb = client.player.getQueue(message.guild.id).filters.gate;
    if (!bb) {
        client.player.setFilters(message.guild.id, {
            gate: true
        });
        message.channel.send("Efek Gate telah diaktifkan!");
    } else {
        client.player.setFilters(message.guild.id, {
            gate: false
        });
        message.channel.send("Efek Gate telah dinonaktifkan!");
    }

}

exports.conf = {
    aliases: [],
    cooldown: 5
}

exports.help = {
    name: 'gate',
    description: 'memberi efek gate pada musik',
    usage: 'gate [<true/false>]',
    example: 'gate'
}
