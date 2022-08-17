const { Client, GatewayIntentBits } = require("discord.js");
const env = require("dotenv");

env.config()

console.log(process.env.TOKEN)

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
] });


client.login(process.env.TOKEN);
