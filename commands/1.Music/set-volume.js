const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  try {

    if (!message.member.voice.channel) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | Kamu harus masuk Voice Channel terlebih dahulu!`
      }
    })

    if (!client.player.isPlaying(message.guild.id)) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | Tidak ada musik yang diputar!`
      }
    })
    let volume = parseInt(args.join(" "));
    if (!volume) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | Masukkan nilai Volumenya!`
      }
    })
    if (isNaN(args[0])) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | Masukkan nilai yang valid!`
      }
    })

    client.player.setVolume(message.guild.id, volume);

    message.channel.send({
      embed: {
        color: client.colors.success,
        description: `${client.emotes.success} | Volume diubah ke \`${args.join(" ")}\` `
      }
    })
  } catch (error) {
    return message.channel.send(`Something went wrong: ${error.message}`);
    // Restart the bot as usual.
  }
}

exports.conf = {
  aliases: ["v"],
  cooldown: 5
}

exports.help = {
  name: 'volume',
  description: 'mengatur volume',
  usage: 'k!volume <angka>',
  example: 'k!volume <5>'
}