import Discord from 'discord.js';
import dotenv from 'dotenv';
import readMessage from './routes/readMessage.js';
import joinedServer from './routes/joinedGuild.js';
import ejectedServer from './routes/ejectedGuild.js';
import reactMessage from './routes/reactMessage.js';

//Configs
dotenv.config();

// Consts
const client = new Discord.Client();
const { BOT_TOKEN } = process.env;

client.on('ready', () => {
  //Log de start
  const { username, id } = client.user;
  console.log(`Bot ${username} (#${id}) iniciado!`);
  //Status
  client.user.setActivity('"..help" for support', {
    type: 'PLAYING',
  });
  /*
  EVENT DATA
    id: '722159579215036458',
    name: 'Testes Bot',
    systemChannelID: '722159579215036461',
    ownerID: '252440678955483138',
  */
});

//When the bot entered in a guild
client.on('guildCreate', (event) => {
  joinedServer(client, event);
});

//When the bot is ejected by guild
client.on('guildDelete', (event) => {
  ejectedServer(client, event);
});

//When someone text
client.on('message', (message) => {
  readMessage(client, message);
});

//When someone react
client.on('messageReactionAdd', (event, user) => {
  reactMessage(client, event, user);
});

client.login(BOT_TOKEN);
