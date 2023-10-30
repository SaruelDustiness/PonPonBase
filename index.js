require('dotenv').config({ path: './chaves/chaves.env' });

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const PonPon = new Client({
	intents: [
		GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
	// eslint-disable-next-line comma-dangle
	],
  disableMentions: 'everyone',
});

// Leitura de comandos
PonPon.commands = new Collection();
PonPon.cooldowns = new Collection();
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

//Carregamento dos eventos ready.js e criarInteracao.js
const eventosDir = path.join(__dirname, 'eventos');
const eventosFiles = fs.readdirSync(eventosDir).filter(file => file.endsWith('.js'));

for (const file of eventosFiles){
  const filePath = path.join(eventosDir, file);
  const evento = require(filePath);
  if (evento.once){
    PonPon.once(evento.name, (...args) => evento.execute(...args));
  } else {
    PonPon.on(evento.name, (...args) => evento.execute(...args));
  }
}

PonPon.login(process.env.TOKEN);
