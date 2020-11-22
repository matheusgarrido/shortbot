import * as guildService from '../service/guildService.js';

async function reactMessage(client, event, user) {
  /*Continue:
  If the message is from the shortbot
  And if the reaction is not from the shortbot
  */
  if (
    event.message.author.id === client.user.id &&
    client.user.id !== user.id
  ) {
    const { channel } = event.message;
    const emoji = event._emoji.name;
    const idGuild = event.message.channel.guild.id;
    const guild = await guildService.getGuild(idGuild);
    console.log(guild);
    console.log(emoji);

    switch (emoji) {
      case '1️⃣':
        console.log('Alterar nome');
        break;
      case '2️⃣':
        console.log('Alterar valor');
        break;
      case '❌':
        console.log('Excluir atalho');
        break;
    }
    channel.send(user.username + ' reagiu! ');
  }
}

export default reactMessage;
