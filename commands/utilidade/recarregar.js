const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('recarregar')
		.setDescription('Recarrega os comandos.')
		.addStringOption(option =>
			option.setName('comando')
				.setDescription('O comando a ser carregado.')
				.setRequired(true)),
	async execute(interaction) {
    const commandName = interaction.options.getString('comando', true).toLowerCase();
    const command = interaction.client.commands.get(commandName);

    if (!command) {
      return interaction.reply(`Não há nenhum comando com o nome ${commandName}!`);
    }

    const foldersPath = path.join(__dirname, '../../commands');
    const commandFolders = fs.readdirSync(foldersPath);
    var comandoExato;

    // Verificando todos os comandos do bot
    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        const actualCommand = `${commandsPath}\\${commandName}.js`;

        if (filePath == actualCommand) {
          console.log(filePath);
          console.log(actualCommand);

          delete require.cache[require.resolve(`${commandsPath}\\${command.data.name}.js`)];
          comandoExato = `${commandsPath}\\${command.data.name}.js`;
          
        }
      }
    }

    try {
      interaction.client.commands.delete(command.data.name);
      const newCommand = require(comandoExato);
      interaction.client.commands.set(newCommand.data.name, newCommand);
      await interaction.reply(`O comando ${newCommand.data.name} foi recarregado!`);
    } catch (error) {
      console.error(error);
      await interaction.reply(`Ocorreu um erro ao tentar recarregar o comando ${command.data.name}:\n${error.message}`);
    }
	},
};
