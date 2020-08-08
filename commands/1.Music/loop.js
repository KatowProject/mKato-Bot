const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {

  if (!message.member.voice.channel) return message.channel.send({
    embed: {
      color: client.colors.error,
      description: `${client.emotes.error} | Kamu harus memasuki *Voice Channel* terlebih dahulu!`
    }
  });
  if (!client.player.isPlaying(message.guild.id)) return message.channel.send({
    embed: {
      color: client.colors.error,
      description: `${client.emotes.error} | Tidak ada Musik yang diputar!`
    }
  });

  const mode = client.player.getQueue(message.guild.id).repeatMode;
  if (mode) {
    client.player.setRepeatMode(message.guild.id, false)
    message.channel.send('*Repeat* telah dinonaktifkan!');

  } else {
    client.player.setRepeatMode(message.guild.id, true)
    message.channel.send('*Repeat* telah diaktifkan!')

    let song = await client.player.nowPlaying(message.guild.id);

    message.channel.send({
      embed: {
        color: client.colors.success,
        description: `${client.emotes.repeat} | Repeating [${song.name}](${song.url})!`
      }
    })
  };

  // Get the current song


}


exports.conf = {
  aliases: ["loop"],
  cooldown: 5
}

exports.help = {
  name: 'repeat',
  description: 'mengulang kembali lagu',
  usage: 'repeat',
  example: 'repeat'
}
