const { Client, Intents } = require("discord.js");
const { token } = require("./config/config.json");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});



client.login(options.token || token);
