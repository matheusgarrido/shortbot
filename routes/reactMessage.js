import * as guildService from '../service/guildService.js';
import * as contentService from '../service/contentService.js';
import deleteContent from '../helper/deleteCommand.js';
import { menuOptionUpdate } from '../helper/updateCommand.js';

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

    const { id: idContent, state, idMessage: message } = guild.currentShortcut;
    const content = await contentService.getContentById(idContent);

    // console.log("=======GUILD=====");
    // console.log(guild);
    // console.log("=======CONTENT=====");
    // console.log(content);

    //If content exists
    if (content) {
      //Delete menu
      const idChannel = event.message.channel.id;
      if (state === 'update_delete') {
        deleteContent(event, guild, client);
      }
      //If started update or is in name/value update
      else if (
        state === 'update_name' ||
        state === 'update_value' ||
        state === 'update_selectoption'
      ) {
        menuOptionUpdate(event, guild, client);
      }
    }
    //Not found in guild.currentShortcut
    else {
      channel.send(
        'O conteúdo não está mais disponível para alteração no momento.\nCaso deseje alterá-lo, digite ..update seguido do nome.'
      );
    }
  }
}

export default reactMessage;
