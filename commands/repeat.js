const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const env = require("dotenv");

env.config()

const data = require("../data.json");

const repeatCommand = new SlashCommandBuilder()
.setName('repeat')
.setDescription('Repeats a particular message added to the global mimics.')
.addStringOption(option =>
	option.setName('name')
		.setDescription('The name of said message you want shrine to say.')
		.setRequired(true))

module.exports = {
	data: repeatCommand,
	async execute(interaction) {
		try {
			// prevent non-announcers from using it
			if (interaction.member.guild.ownerId !== interaction.member.id && !interaction.member.roles.cache.some(role => role.name === process.env.ANNOUNCER_ROLE)) {
				throw Error(`You don't have high enough permissions to use this command. You either have to be the owner or have a \`${process.env.ANNOUNCER_ROLE}\` role.`)
			}
			const mimic = interaction.options.getString("name")
			if (!data.mimiced.hasOwnProperty(mimic)) {
				throw Error('Can\'t find a mimic with that specific name inside of the global mimics try using the `/viewmimics` command')
			}
			const mimicEmbed = new EmbedBuilder()
				.setColor('#ffffff')
				.addFields(
					{ name: `Shrine -> ${mimic}`, value: data.mimiced[mimic].name },
				)
			if (data.mimiced[mimic].img) {
				mimicEmbed.setImage(data.mimiced[mimic].img)
			}
			await interaction.reply({embeds: data.mimiced[mimic].vid ? null : [ mimicEmbed ], content: data.mimiced[mimic].vid});
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