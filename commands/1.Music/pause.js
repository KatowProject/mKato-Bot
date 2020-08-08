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

    await client.player.pause(message.guild.id);

    message.channel.send({
      embed: {
        color: client.colors.success,
        description: `${client.emotes.pause} | Dijedakan!`
      }
    })
  } catch (error) {
    return message.channel.send(`Something went wrong: ${error.message}`);
    // Restart the bot as usual.
  }
}

exports.conf = {
  aliases: ["jeda"],
  cooldown: 5
}

exports.help = {
  name: 'pause',
  description: 'menjeda musik',
  usage: 'k!pause',
  example: 'k!pause'
}