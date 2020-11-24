import * as guildService from '../service/guildService.js';
import * as contentService from '../service/contentService.js';
import * as messageService from '../service/messageService.js';
import { returnToUpdate } from '../helper/updateCommand.js';

async function deleteContent(event, guild, client) {
  const { channel } = event.message;
  const emoji = event._emoji.name;
  const idGuild = guild._id;
  const idChannel = channel.id;
  const { id: idContent, idMessage: message } = guild.currentShortcut;

  switch (emoji) {
    //Confirm delete
    case '✅':
      await guildService.setCurrentShortCut(
        client,
        idGuild,
        false,
        idContent,
        message,
        idChannel
      );
      await contentService.deleteContent(idContent);
      channel.send('Atalho excluído!');
      break;
    //Abort delete
    case '❌':
    default:
      returnToUpdate(client, event, idContent);
      break;
  }
}

export default deleteContent;
