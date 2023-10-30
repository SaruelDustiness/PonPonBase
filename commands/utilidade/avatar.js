const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Pega a URL da sua foto de perfil ou do usuário solicitado.')
		.addUserOption(option => option.setName('alvo').setDescription('O usuário alvo')),
	category: 'utility',
	async execute(interaction) {
		const user = interaction.options.getUser('alvo');
		if (user) return interaction.reply(`A foto de perfil de ${user.username}: ${user.displayAvatarURL()}`);
		return interaction.reply(`Sua foto de perfil: ${interaction.user.displayAvatarURL()}`);
	},
};
