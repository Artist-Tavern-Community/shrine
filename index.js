const { Client, GatewayIntentBits, Collection } = require("discord.js");
const env = require("dotenv");
const fs = require('node:fs');
const path = require('node:path');

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

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}


client.login(process.env.TOKEN);
