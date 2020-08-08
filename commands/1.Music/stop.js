const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  try {

    if (!message.member.voice.channel) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | Kamu harus masuk Channel Voice terlebih dahulu!`
      }
    })

    if (!client.player.isPlaying(message.guild.id)) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | tidak ada yang diputar!`
      }
    })

    let song = await client.player.stop(message.guild.id);

    message.channel.send({
      embed: {
        color: client.colors.success,
        description: `${client.emotes.stop} | Diputuskan!`
      }
    })
  } catch (error) {
    return message.channel.send(`Something went wrong: ${error.message}`);
    // Restart the bot as usual.
  }
}

exports.conf = {
  aliases: ["dc"],
  cooldown: 5
}

exports.help = {
  name: 'stop',
  description: 'menghentikan musik',
  usage: 'k!stop',
  example: 'k!stop'
}