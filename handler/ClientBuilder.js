const { Client, Collection } = require("discord.js");
const Util = require("./util.js");
const { Player } = require('discord-player');

module.exports = class katopos extends Client {
  constructor(opt) {
    super(opt);

    this.util = new Util();
    this.commands = new Collection();
    this.cooldowns = new Collection();
    this.aliases = new Collection();
    this.config = require("../config/config.json");
    this.recent = new Set();
    this.player = new Player(new Client(), {
      leaveOnEnd: true,
      leaveOnEnd: true,
      leaveOnEmpty: true
    })
    this.colors = require('../config/colors.json')
    this.emotes = require('../config/emojis.json')
  }
};
