const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 3600,
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Retorna informações sobre o usuário.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Esse comando foi realizado por ${interaction.user.username}, que entrou no servidor em ${interaction.member.joinedAt}.`);
	},
};
