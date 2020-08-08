const Discord = require("discord.js")
const fs = require("fs");
const { error } = require("console");

module.exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send({
        embed: {
            color: client.colors.error,
            description: `${client.emotes.error} | Kamu harus masuk Channel Voice terlebih dahulu!`
        }
    })

    let search = await client.player.searchTracks(args.join(' '), true)
    // Sends an embed with the 10 first songs
    if (search.length > 10) search = search.slice(0, 10)
    const embed = new Discord.MessageEmbed().setColor(client.colors.success)
        .setDescription(search.map((t, i) => `**${i + 1} -** [${t.name}](${t.url})`).join("\n"))
        .setFooter("Send the number of the track you want to play!");
    message.channel.send(embed);
    // Wait for user answer
    let response = await message.channel.awaitMessages((m) => m.content > 0 && m.content < 20, {
        max: 1,
        time: 20000,
        errors: ["time"]
    }).catch((err) => {
        message.reply('Waktu permintaan telah habis, silahkan buat permintaan kembali!')
    })
    const index = parseInt(response.first().content);
    let track = search[index - 1];
    // Then play the song
    let requestedBy = `\`${client.users.cache.get(message.author.id).tag}\``
    let playing = client.player.isPlaying(message.guild.id)

    if (playing) {
        // Add the song to the queue 
        let song = await client.player.addToQueue(message.guild.id, track, requestedBy);


        message.channel.send({
            embed: {
                color: client.colors.success,
                description: `${client.emotes.success} **|** [${song.name}](${song.url}) **Added to the queue!** \n\n Durasi: \`${song.duration}\`\n\nPermintaan : ${song.requestedBy}\n\n Author: \`${song.author}\``,
                thumbnail: { url: song.thumbnail }
            }
        });

    } else {
        // Else, play the song
        let song = await client.player.play(message.member.voice.channel, track, requestedBy);

        message.channel.send({
            embed: {
                color: client.colors.success,
                description: `${client.emotes.music} | Now Playing : \n [${song.name}](${song.url})\n \nDurasi : ${song.duration}\n \nPermintaan : ${song.requestedBy}`,
                thumbnail: { url: song.thumbnail }
            }
        })


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


}

exports.conf = {
    aliases: ['search'],
    cooldown: 5
}

exports.help = {
    name: 'search',
    description: 'mencari lalu, memulai musik',
    usage: 'search <query>',
    example: 'search kato cantik'
}
