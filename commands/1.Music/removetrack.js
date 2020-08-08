const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    try {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | Kamu harus masuk Channel Voice terlebih dahulu!`)

        if (!client.player.isPlaying(message.guild.id)) return message.channel.send({
            embed: {
                color: client.colors.error,
                description: `${client.emotes.error} | There is nothing playing!`
            }
        })

        await client.player.remove(message.guild.id, args.join(' '))

        await message.channel.send({
            embed: {
                color: client.colors.success,
                description: `${client.emotes.success} | Telah Menghapus Antrian ke ${args.join(' ')}`
            }
        })
    } catch (error) {
        return message.channel.send(`Something went wrong: ${error.message}`);
        // Restart the bot as usual.
    }
}

exports.conf = {
    aliases: [],
    cooldown: 5
}

exports.help = {
    name: 'remove',
    description: 'menghapus lagu yang dipilihkan pada antrian lagu',
    usage: 'remove <number>',
    example: 'remove 1'
}