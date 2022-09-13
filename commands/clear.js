const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const env = require("dotenv");

env.config()

const data = require("../data.json");

const clearCommand = new SlashCommandBuilder()
.setName('clear')
.setDescription('Clear one or more messages.')
.addIntegerOption(option =>
	option.setName('limit')
		.setDescription('The number of messages you want deleted.')
		.setRequired(true))

module.exports = {
	data: clearCommand,
	async execute(interaction) {
		try {
			// prevent non-announcers from using it
			if (interaction.member.guild.ownerId !== interaction.member.id && !interaction.member.roles.cache.some(role => role.name === process.env.ANNOUNCER_ROLE)) {
				throw Error(`You don't have high enough permissions to use this command. You either have to be the owner or have a \`${process.env.ANNOUNCER_ROLE}\` role.`)
			}
			const limit = interaction.options.getInteger("limit")
			const clearEmbed = new EmbedBuilder()
				.setColor('#ffffff')
				.addFields(
					{ name: `Shrine > Clear`, value: `Removed \`${limit}\` message(s)` },
				)
			await interaction.channel.bulkDelete(limit);
			await interaction.reply({ embeds: [ clearEmbed ] });
			setTimeout(async () => {
				await interaction.deleteReply()
			}, 2000)
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