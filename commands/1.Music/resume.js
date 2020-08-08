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
        description: `${client.emotes.error} | tidak ada musik yang diputar!`
      }
    });

    let song = await client.player.resume(message.guild.id);

    message.channel.send({
      embed: {
        color: client.colors.success,
        description: `${client.emotes.resume} | Dilanjutkan!`
      }
    });
  } catch (error) {
    return message.channel.send(`Something went wrong: ${error.message}`);
    // Restart the bot as usual.
  }
}

exports.conf = {
  aliases: ['r'],
  cooldown: 5
}

exports.help = {
  name: 'resume',
  description: 'melanjutkan musik yang dijeda',
  usage: 'k!resume',
  example: 'k!resume'
}