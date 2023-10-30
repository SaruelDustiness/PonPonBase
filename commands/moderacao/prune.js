const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Limpa até 99 mensagens.')
		.addIntegerOption(option =>
			option.setName('quantidade')
				.setDescription('Número de mensagens para apagar')
				.setMinValue(1)
				.setMaxValue(100)),
	category: 'moderation',
	async execute(interaction) {
		const amount = interaction.options.getInteger('quantidade');

		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'Ocorreu um erro ao tentar limpar as mensagens do canal!', ephemeral: true });
		});

		return interaction.reply({ content: `Foram apagadas \`${amount}\` mensagens do canal.`, ephemeral: true });
	},
};
