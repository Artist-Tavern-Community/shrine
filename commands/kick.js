const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path')
const env = require("dotenv")

env.config()

const data = require("../data.json");

const kickCommand = new SlashCommandBuilder()
.setName('kick')
.setDescription('Kick a specified member')
.addUserOption(option => 
	option.setName('user')
		.setDescription('The name of the user you want banned.')
		.setRequired(true))

module.exports = {
	data: kickCommand,
	async execute(interaction) {
		try {
			// prevent non-announcers from using it
			if (interaction.member.guild.ownerId !== interaction.member.id || interaction.member.roles.cache.some(role => role.name === process.env.ANNOUNCER_ROLE)) {
				throw Error(`You don't have high enough permissions to use this command. You either have to be the owner or have a \`${process.env.ANNOUNCER_ROLE}\` role.`)
			}
			const member = interaction.options.getUser('user');
			const kickEmbed = new EmbedBuilder()
				.setColor('#ffffff')
				.addFields(
					{ name: `Shrine > Kick`, value: `Successfully kicked \`${member.username}\`` },
				)
				.setTimestamp();
			interaction.guild.members.kick(member);
			await interaction.reply({ embeds: [ kickEmbed ] });
		}
		catch (err) {
			const errorEmbed = new EmbedBuilder()
				.setColor('#ffffff')
				.addFields(
					{ name: 'Shrine > Error', value: "Likely due to lack of permissions check your permisisons and try kicking again." },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ errorEmbed ], ephemeral: true });
		}
	},
};