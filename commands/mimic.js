const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path')
const data = require("../data.json");

const mimiced = data.mimiced;

function saveMimic(name, msg) {
	// prevent the same entry
	if (data.mimiced.hasOwnProperty(name)) {
		throw Error("Error: There is already one with the exact same name. Try using a different one.")
	}
	let new_copy = data
	new_copy.mimiced[name] = msg 
	fs.writeFile(path.join(__dirname, path.normalize("../data.json")), JSON.stringify(new_copy), (res) => {
		console.log(res)
	})
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mimic')
		.setDescription('Setup a message for use in a announcement.')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The name of said message you want to save.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('msg')
				.setDescription('The message you want to save.')
				.setRequired(true)),
	async execute(interaction) {
		try {
			const name = interaction.options.getString("name")
			const msg = interaction.options.getString("msg")
			const mimicEmbed = new EmbedBuilder()
				.setColor('#ffffff')
				.addFields(
					{ name: `Shrine > Mimic -> ${name}`, value: msg },
				)
				.setTimestamp();
			saveMimic(name, msg)
			await interaction.reply({ embeds: [ mimicEmbed ] });
		}
		catch (err) {
			const errorEmbed = new EmbedBuilder()
				.setColor('#ffffff')
				.addFields(
					{ name: 'Shrine > Error', value: err.message },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ errorEmbed ], ephemeral: true });
		}
	},
};