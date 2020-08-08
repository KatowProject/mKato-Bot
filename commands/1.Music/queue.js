const { Util } = require('discord.js');

exports.run = async (client, message, args) => {
  try {

    if (!message.member.voice.channel) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | Kamu harus masuk Channel Voice terlebih dahulu!`
      }
    })

    let queue = client.player.getQueue(message.guild.id);

    if (!queue) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | Tidak ada musik yang diputar!`
      }
    })

    const q = queue.tracks.map((track, i) => {
      return `${i + 1} . [${track.name}](${track.url}) - **${track.author}**`
    }).join('\n');

    let current = await client.player.nowPlaying(message.guild.id)
    current = `▶ | **${current.name}** - **${current.author}**\n` || 'tidak ada antrian'
    current += q
    let chunks = client.util.splitEmbedDescription(current, "\n");
    let total = chunks.length;
    let first = chunks.shift();
    message.channel.send({
      embed: {
        title: `Antrian Lagu`,
        color: client.colors.success,
        description: `${first}`,
        footer: {
          text: `Page 1/${total}`
        },
        timestamp: new Date()
      }
    })
    chunks.forEach((c, i) => {

      message.channel.send({
        embed: {
          title: `Antrian Lagu`,
          color: client.colors.kato,
          description: c,
          footer: {
            text: `Page ${i + 2}/${total}`
          },
          timestamp: new Date()
        }
      });
    })
  } catch (error) {
    return message.channel.send(`Something went wrong: ${error.message}`);
    // Restart the bot as usual.
  }
}

exports.conf = {
  aliases: ['q'],
  cooldown: 5
}

exports.help = {
  name: 'queue',
  description: 'Melihat antrian lagu',
  usage: 'k!queue',
  example: 'k!queue'
}