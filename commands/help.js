const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const helpCommand = new SlashCommandBuilder()
.setName('help')
.setDescription('View help information.')

module.exports = {
	data: helpCommand,
	async execute(interaction) {
		try {
			const helpEmbed = new EmbedBuilder()
				.setColor('#ffffff')
				.addFields(
					{ name: 'Shrine > Help', value: 'This bot is still WIP so don\'t expect perfect functionality. However commands can be seen using the interface seen when using. `/`' },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ helpEmbed ] });
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