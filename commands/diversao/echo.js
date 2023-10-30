const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Responde com o que você digitar!')
    .addStringOption(option =>
      option.setName('saida')
        .setDescription('Digite aqui o que você quer que eu fale.')
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('canal')
        .setDescription('O canal onde a mensagem será enviada.')
        .setRequired(false))
        // Ensure the user can only select a TextChannel for output
        // .addChannelTypes(ChannelType.GuildText))
    .addAttachmentOption(option =>
      option.setName('arquivo')
        .setDescription('Coloque aqui o arquivo que deseja envviar.')
        .setRequired(false)),
  async execute(interaction) {
    const texto = interaction.options.getString('saida', true);
    const saidaCanal = interaction.options.getChannel('canal');
    const saidaArquivo = interaction.options.getAttachment('arquivo');
  }
}


