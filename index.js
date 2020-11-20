import Discord from 'discord.js';
import dotenv from 'dotenv';
import readMessage from './routes/readMessage.js';
import joinedServer from './routes/joinedGuild.js';
import ejectedServer from './routes/ejectedGuild.js';

//Configs
dotenv.config();

// Consts
const client = new Discord.Client();
const { BOT_TOKEN } = process.env;

client.on('ready', () => {
  const { username, id } = client.user;
  console.log(`Bot ${username} (#${id}) iniciado!`);
  /*
  EVENT DATA
    id: '722159579215036458',
    name: 'Testes Bot',
    systemChannelID: '722159579215036461',
    ownerID: '252440678955483138',
  */
});

client.on('guildCreate', (event) => {
  joinedServer(client, event);
});
client.on('guildDelete', (event) => {
  ejectedServer(client, event);
});

client.on('message', (message) => {
  readMessage(client, message);
});

client.login(BOT_TOKEN);
