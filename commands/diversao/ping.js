const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	async execute(interaction) {
    await interaction.deferReply();
		await wait(1000);
		await interaction.editReply('Pong!');
	},
};
