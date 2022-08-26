const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const pingCommand = new SlashCommandBuilder()
.setName('ping')
.setDescription('Sends a ping and shows the results.')

module.exports = {
	data: pingCommand,
	async execute(interaction) {
		try {
			const msg = await interaction.reply({ content: 'Sending ping...', fetchReply: true });
			await interaction.editReply({ content: `Pong!\nBot Latency: \`${msg.createdTimestamp - interaction.createdTimestamp}ms\``});
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