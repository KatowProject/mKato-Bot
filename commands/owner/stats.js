const { MessageEmbed, version } = require('discord.js');;

exports.run = async (client, message, args) => {
    try {

        const uptime = client.util.parseDur(client.uptime);
        const botVersion = version;
        const users = await client.users.cache.size;
        const channels = await client.channels.cache.size;
        const servers = await client.guilds.cache.size;

        if (!args[0]) {
            message.channel.send(`\`\`\`asciidoc
Mem. Usage :: ${Math.floor(process.memoryUsage().heapUsed / 1048576)} MB
Uptime     :: ${uptime}
WS Ping    :: ${client.ws.ping}ms
Users      :: ${users.toLocaleString()}
Servers    :: ${servers.toLocaleString()}
Channels   :: ${channels.toLocaleString()}
Bot Vers.  :: ${botVersion}
Discord.js :: v${version}
Node       :: ${process.version}\`\`\``);
        } else if (args[0] == "server") {
            if (!client.config.owners.includes(message.author.id)) return;

            let guildsCount = [];
            let servers = client.guilds.cache
                .array()
                .slice()
                .map((x) => x)
                .sort((a, b) =>
                    a.memberCount < b.memberCount
                        ? 1
                        : b.memberCount < a.memberCount
                            ? -1
                            : 0
                );
            for (var [i, x] of servers.entries()) {
                guildsCount.push(`\`${i + 1}\`. ${x.name} = \`${x.memberCount}\``);
            }

            guildsCount = client.util.chunk(guildsCount, 15);
            let page = 1;
            const embed = new MessageEmbed()
                .setColor(client.config.color)
                .setFooter(`Page ${page} of ${guildsCount.length}`)
                .setDescription(guildsCount[page - 1]);
            let m = await message.channel.send(embed);

            // clear all reactions
            // client.setInterval(() => {
            //     m.clearReactions();
            // }, 120000);

            await m.react(`◀`);
            await m.react(`▶`);
            const backwardsFilter = (reaction, user) =>
                reaction.emoji.name === `◀` && user.id === message.author.id;
            const forwardsFilter = (reaction, user) =>
                reaction.emoji.name === `▶` && user.id === message.author.id;
            const backwards = m.createReactionCollector(backwardsFilter);
            const forwards = m.createReactionCollector(forwardsFilter);

            backwards.on("collect", (r) => {
                r.remove(message.author.id);
                if (page === 1) return;
                page--;
                embed.setDescription(guildsCount[page - 1]);
                embed.setFooter(`Page ${page} of ${guildsCount.length}`);
                m.edit(embed);
            });

            forwards.on("collect", (r) => {
                r.remove(message.author.id);
                if (page === guildsCount.length) return;
                page++;
                embed.setDescription(guildsCount[page - 1]);
                embed.setFooter(`Page ${page} of ${guildsCount.length}`);
                m.edit(embed);
            });
        }

    } catch (err) {
        console.log(err);

    }
}

exports.conf = {
    aliases: [],
    cooldown: 5
}

exports.help = {
    name: 'stats',
    description: 'Melihat status bot kato.',
    usage: 'nhen stats',
    example: 'nhen stats'
}