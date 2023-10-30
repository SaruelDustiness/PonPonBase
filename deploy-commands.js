require('dotenv').config({ path: './chaves/chaves.env' });

const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config/config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Pega todos os arquivos dos diretórios de comandos que você criou
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Pega todos os arquivos dos diretórios de comandos que você criou
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Pega os dados de saída de cada comando SlashCommandBuilder#toJSON()
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Constrói e prepara o módulo REST
const PonToken = process.env.TOKEN;
const PonGuild = process.env.GUILD;
const PonClient = process.env.CLIENTID;
const rest = new REST().setToken(token);

// e envia os comandos!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// O comando put atualiza todos os comandos para o seu servidor
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// garante que voce receba todos os erros no log!
		console.error(error);
		console.log('deu erro');
	}
})();
