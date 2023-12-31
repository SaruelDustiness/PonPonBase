const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 3600,
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Retorna informações sobre o servidor.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`Este é o servidor ${interaction.guild.name} e possui ${interaction.guild.memberCount} membros.`);
	},
};
