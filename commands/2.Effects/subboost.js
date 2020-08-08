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


    //mulai efeknya
    const bb = client.player.getQueue(message.guild.id).filters.subboost;
    if (!bb) {
        client.player.setFilters(message.guild.id, {
            subboost: true
        });
        message.channel.send("Efek Subboost telah diaktifkan!");
    } else {
        client.player.setFilters(message.guild.id, {
            subboost: false
        });
        message.channel.send("Efek Subboost telah dinonaktifkan!");
    };

}

exports.conf = {
    aliases: [],
    cooldown: 5
}

exports.help = {
    name: 'subboost',
    description: 'menberikan efek subboost pada musik',
    usage: 'k@subboost <on/off>',
    example: 'k@subboost on'
}
