const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path')
const env = require("dotenv")

env.config()

const data = require("../data.json");

const viewMimicsCommand = new SlashCommandBuilder()
.setName('viewmimics')
.setDescription('View all mimics currently stored.')

module.exports = {
	data: viewMimicsCommand,
	async execute(interaction) {
		try {
			// prevent non-announcers from using it
			if (interaction.member.guild.ownerId !== interaction.member.id || interaction.member.roles.cache.some(role => role.name === process.env.ANNOUNCER_ROLE)) {
				throw Error(`You don't have high enough permissions to use this command. You either have to be the owner or have a \`${process.env.ANNOUNCER_ROLE}\` role.`)
			}
			let count = 1;
			let tmp;
			const msg = Object.entries(data.mimiced)
							.map(entry => {
								tmp = `**__${count}. ${entry[0]}__**`
								count += 1
								return tmp;
							})
			console.log(msg)
			const viewMimicsEmbed = new EmbedBuilder()
				.setColor('#ffffff')
				.addFields(
					{ name: `Shrine > View Mimics`, value: msg.join('\n') },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ viewMimicsEmbed ] });
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