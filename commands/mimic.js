const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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