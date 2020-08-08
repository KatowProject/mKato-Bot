const Discord = require('discord.js');
/*
const duration = (22400 * 10);
const res = {
    seconds: Math.floor((duration / 1000) % 60),
    minutes: Math.floor((duration / (1000 * 60)) % 60),
    hours: Math.floor((duration / (1000 * 60 * 60)))
};
console.log(res)

*/
exports.run = async (client, message, args) => {
  try {

    if (!message.member.voice.channel) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | Kamu harus masuk Channel Voice terlebih dahulu!`
      }
    });

    if (!client.player.isPlaying(message.guild.id)) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | Tidak ada musik yang diputar!`
      }
    });

    let song = await client.player.nowPlaying(message.guild.id);

    message.channel.send({
      embed: {
        color: client.colors.success,
        description: `${client.emotes.music} **| Now Playing:**\n[${song.name}](${song.url}) 
                      \n\nAuthor: \`${song.author}\`\nDurasi: \`${song.duration}\`\n${client.player.createProgressBar(message.guild.id)} 
                      \nDitonton: \`${client.util.nilai(song.views)}x\`\nPermintaan: ${song.requestedBy}`,
        thumbnail: {
          url: song.thumbnail.replace('hqdefault.jpg', 'maxresdefault.jpg')
        }
      }
    });

  } catch (error) {
    return message.channel.send(`Something went wrong: ${error.message}`);
    // Restart the bot as usual.
  }
}

exports.conf = {
  aliases: ["np"],
  cooldown: 5
}

exports.help = {
  name: 'now-playing',
  description: 'melihat musik yang sedang diputar!',
  usage: 'k!np',
  example: 'k!np'
}