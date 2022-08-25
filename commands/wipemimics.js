const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path')
const env = require("dotenv")

env.config()

const data = require("../data.json");

function wipeMimics(name, msg) {
	let new_copy = data
	new_copy.mimiced = {}
	fs.writeFile(path.join(__dirname, path.normalize("../data.json")), JSON.stringify(new_copy), (res) => {
		return res;
	})
}

const wipeMimicsCommand = new SlashCommandBuilder()
.setName('wipemimics')
.setDescription('Remove all mimics currently saved.')

module.exports = {
	data: wipeMimicsCommand,
	async execute(interaction) {
		try {
			// prevent non-announcers from using it
			if (interaction.member.guild.ownerId !== interaction.member.id || interaction.member.roles.cache.some(role => role.name === process.env.ANNOUNCER_ROLE)) {
				throw Error(`You don't have high enough permissions to use this command. You either have to be the owner or have a \`${process.env.ANNOUNCER_ROLE}\` role.`)
			}
			const mimicClearEmbed = new EmbedBuilder()
				.setColor('#ffffff')
				.addFields(
					{ name: `Shrine > Wipe Mimics`, value: "Successfully cleared all mimics." },
				)
				.setTimestamp();
			wipeMimics()
			await interaction.reply({ embeds: [ mimicClearEmbed ] });
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