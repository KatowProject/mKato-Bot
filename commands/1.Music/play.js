const Discord = require('discord.js')
const moment = require('moment');

exports.run = async (client, message, args) => {

  try {

    if (!message.member.voice.channel) return message.channel.send({
      embed: {
        color: client.colors.error,
        description: `${client.emotes.error} | Kamu harus masuk Channel Voice terlebih dahulu!`
      }
    })

    //Permintaan Lagu dan Nama Permintaan
    let requestedBy = `\`${client.users.cache.get(message.author.id).tag}\``
    let queue = args.join(" ")
    if (!queue) return message.channel.send({
      embed: {
        color: client.colors.success,
        description: `${client.emotes.error} | Please enter a query to search`
      }
    });

    let playing = client.player.isPlaying(message.guild.id)
    if (playing) {
      // Add the song to the queue 
      const song = await client.player.addToQueue(message.guild.id, queue, requestedBy);
      if (!song) return message.reply({
        embed: {
          color: client.colors.error,
          description: `Mungkin permintaan yang Kamu inginkan tidak mendukung 😥`
        }
      })

      if (song.type === 'playlist') {
        message.channel.send({
          embed: {
            color: client.colors.success,
            description: `${client.emotes.success} **|** ${song.tracks.length} Lagu telah ditambahkan ke daftar antrian!`
          }
        });
      } else {
        message.channel.send({
          embed: {
            color: client.colors.success,
            description: `${client.emotes.success} **|** [${song.name}](${song.url}) **Added to the queue!** \n\n Durasi: \`${song.duration}\`\n\n Permintaan : ${song.requestedBy}\n\n Author: \`${song.author}\``,
            thumbnail: { url: song.thumbnail.replace('hqdefault', 'maxresdefault') }
          }
        });
      };


    } else {
      // Else, play the song
      const song = await client.player.play(message.member.voice.channel, queue, requestedBy);
      if (!song) return message.reply({
        embed: {
          color: client.colors.error,
          description: `Mungkin permintaan yang Kamu inginkan tidak mendukung 😥`
        }
      })

      if (song.type === 'playlist') {
        message.channel.send({
          embed: {
            color: client.colors.success,
            description: `${client.emotes.success} **|** ${song.tracks.length} lagu telah ditambahkan antrian\n
            Now Playing: [${result.tracks[0].name}](${result.tracks[0].url})`
          }
        });
      }
      else {
        message.channel.send({
          embed: {
            color: client.colors.success,
            description: `${client.emotes.music} | Now Playing : \n [${song.name}](${song.url})\n \nDurasi : \`${song.duration}\`\n \nPermintaan : ${song.requestedBy}`,
            thumbnail: { url: song.thumbnail.replace('hqdefault', 'maxresdefault') }
          }
        })
      };


      client.player.getQueue(message.guild.id)
        .on('end', () => {
          message.channel.send({
            embed: {
              color: client.colors.warning,
              description: `${client.emotes.warning} | Antrian telah selesai, tambahkan lagu lagi untuk memutar!`
            }
          })

        })

        .on('trackChanged', (oldTrack, newTrack, skipped, repeatMode) => {

          if (repeatMode) {

            message.channel.send({
              embed: {
                color: client.colors.success,
                description: `${client.emotes.music} |  Now Repeating : \n [${oldTrack.name}](${oldTrack.url})\n \nDurasi : ${oldTrack.duration}\n \nPermintaan : ${oldTrack.requestedBy}`,
                thumbnail: {
                  url: oldTrack.thumbnail
                }
              }
            });

          } else {
            message.channel.send({
              embed: {
                color: client.colors.success,
                description: `${client.emotes.music} | Now Playing : \n [${newTrack.name}](${newTrack.url})\n \nDurasi : ${newTrack.duration}\n \nPermintaan : ${newTrack.requestedBy}`,
                thumbnail: newTrack.thumbnail
              }
            })
          }
        });
    }
  } catch (error) {
    return console.log(error)

    // Restart the bot as usual.
  }
}

exports.conf = {
  aliases: ["p"],
  cooldown: 5
}

exports.help = {
  name: 'play',
  description: 'memutarkan sebuah musik',
  usage: 'play',
  example: 'play'
}