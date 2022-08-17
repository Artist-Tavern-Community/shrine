const { Client, GatewayIntentBits } = require("discord.js");
const env = require("dotenv");

env.config()

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
] });

client.once("ready", (bot) => {
    console.log("Status: Successfully ran!")
    console.log(`Running on: ${bot.user.username}`)
    console.log(`Using Token: ${process.env.TOKEN}`)
})


client.login(process.env.TOKEN);
