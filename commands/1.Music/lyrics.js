const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {

    let query = args.join('-')
    if (!query) return message.reply('Masukkan Permintaan terlebih dahulu!')
    const fetch = require('node-fetch')
    const get = await fetch(`https://lyrics-api.powercord.dev/lyrics?input=${query}`, { method: "GET" }).then(res => res.json())


    let data = {
        artis: get.data[0].artist,
        nama: get.data[0].name,
        lirik: get.data[0].lyrics,
        gambar: get.data[0].album_art
    }

    if (data.lirik.length > 2048) {
        let embed = new Discord.MessageEmbed()
            .setColor(client.colors.success)
            .setAuthor(data.artis, data.gambar)
            .setTitle(data.nama)
            .setDescription(data.lirik.slice(0, 2048))
        await message.channel.send(embed);
        let embede = new Discord.MessageEmbed()
            .setColor(client.colors.success)
            .setDescription(data.lirik.slice(2048, 9999))
        await message.channel.send(embede)

    } else {
        let embed = new Discord.MessageEmbed()
            .setColor(client.colors.success)
            .setAuthor(data.artis, data.gambar)
            .setTitle(data.nama)
            .setDescription(data.lirik)
        await message.channel.send(embed)
    }



}


exports.conf = {
    aliases: ["lirik"],
    cooldown: 5
}

exports.help = {
    name: 'lyrics',
    description: 'lirik lagu',
    usage: 'lyrics <query>',
    example: 'repeat <qeury>'
}
