require('dotenv').config({ path: './chaves/chaves.env' });

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
// const { token } = require('./config/config.json');

const PonPon = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
	// eslint-disable-next-line comma-dangle
	]
});

// Leitura de comandos
PonPon.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Verificando todos os comandos do bot
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			PonPon.commands.set(command.data.name, command);
		}
		else {
			console.log(`[AVISO] O comando no diretório ${filePath} está sem as propriedades de "data" ou "execute".`);
		}
	}
}

// Verifica os comandos
PonPon.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`Não foi encontrado o comando ${interaction.commandName}.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'Ocorreu um erro ao tentar executar este comando!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'Ocorreu um erro ao tentar executar este comando!', ephemeral: true });
		}
	}
});

// const prefix = '!';

PonPon.once(Events.ClientReady, p => {
	console.log(`Pronto! Login realizado como ${p.user.tag}`);
});


PonPon.login(process.env.TOKEN);