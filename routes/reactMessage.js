import * as guildService from '../service/guildService.js';
import * as contentService from '../service/contentService.js';
import * as messageService from '../service/messageService.js';
import deleteContent from '../helper/deleteCommand.js';
import { menuOptionUpdate, cancelUpdate } from '../helper/updateCommand.js';

async function reactMessage(client, event, user) {
  /*Continue:
  If the message is from the shortbot
  And if the reaction is not from the shortbot
  */
  console.log(event.message.id);
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
    /*Do:
    If content exists
    If the message is the current state*/
    if (content && message === event.message.id) {
      //Delete menu
      if (state === 'update_delete') {
        deleteContent(event, guild, client);
      }
      //If is in menu update to select option
      else if (state === 'update_selectoption') {
        menuOptionUpdate(event, guild, client);
      }
      //If is in name/value update
      else if (state === 'update_name' || state === 'update_value') {
        cancelUpdate(client, event.message.channel, emoji);
      }
    }
    //Not found in guild.currentShortcut
    else {
      const { region } = event.message.channel.guild;
      let language = await messageService.getMessagesByRegion(region);
      const {
        invalidReactionTitle,
        invalidReactionText,
      } = language.messages.crud;
      const jsonMessage = {
        embed: {
          color: 3447003,
          title: invalidReactionTitle,
          description: invalidReactionText,
        },
      };
      channel.send(jsonMessage);
    }
  }
}

export default reactMessage;
