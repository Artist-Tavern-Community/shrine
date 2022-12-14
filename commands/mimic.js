const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path')
const env = require("dotenv")

env.config()

const data = require("../data.json");

function saveMimic(name, msg, img, vid) {
	// prevent the same entry
	if (data.mimiced.hasOwnProperty(name)) {
		throw Error("Error: There is already one with the exact same name. Try using a different one.")
	}
	let new_copy = data
	new_copy.mimiced[name] = {name: msg, img: img || "", vid: vid || ""} 
	fs.writeFile(path.join(__dirname, path.normalize("../data.json")), JSON.stringify(new_copy), (res) => {
		return res;
	})
}

const mimicCommand = new SlashCommandBuilder()
.setName('mimic')
.setDescription('Setup a message for use in a announcement.')
.addStringOption(option =>
	option.setName('name')
		.setDescription('The name of said message you want to save.')
		.setRequired(true))
	.addStringOption(option =>
		option.setName('msg')
			.setDescription('The message you want to save.')
			.setRequired(true))
	.addStringOption(option =>
		option.setName('img')
			.setDescription('Any image url you\'d like to add.'))
	.addStringOption(option => 
		option.setName('vid')
			.setDescription('Any video url you\'d like to add.'))

module.exports = {
	data: mimicCommand,
	async execute(interaction) {
		try {
			// prevent non-announcers from using it
			if (interaction.member.guild.ownerId !== interaction.member.id && !interaction.member.roles.cache.some(role => role.name === process.env.ANNOUNCER_ROLE)) {
				throw Error(`You don't have high enough permissions to use this command. You either have to be the owner or have a \`${process.env.ANNOUNCER_ROLE}\` role.`)
			}
			const name = interaction.options.getString("name")
			const msg = interaction.options.getString("msg")
			const img = interaction.options.getString("img")
			const vid = interaction.options.getString('vid')
			const mimicEmbed = new EmbedBuilder()
				.setColor('#ffffff')
				.addFields(
					{ name: `Shrine > Mimic -> ${name}`, value: msg },
				)
				.setFooter({text: 'Warning: Due to discord limitations video urls can only be shown by themselves and only some urls are compatible with discord.'})
				.setImage(img)
				.setTimestamp();
			saveMimic(name, msg, img, vid)
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