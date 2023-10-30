const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Quica em um membro do servidor.')
		.addUserOption(option => option.setName('alvo').setDescription('O membro onde você irá quicar').setRequired(true)),
	category: 'moderation',
	async execute(interaction) {
		const member = interaction.options.getMember('alvo');
		return interaction.reply({ content: `Você quis quicar em ${member.user.username}`, ephemeral: true });
	},
};
