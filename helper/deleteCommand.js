import * as guildService from '../service/guildService.js';
import * as contentService from '../service/contentService.js';
import * as messageService from '../service/messageService.js';

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

async function returnToUpdate(client, event, idContent) {
  const { id: idGuild, region } = event.message.guild;
  let language = await messageService.getMessagesByRegion(region);
  const {
    shortcutFound,
    updateCardTitle,
    updateCardText,
    deleteCardTitle,
    deleteCardText,
    finishCardTitle,
    finishCardText,
  } = language.messages.crud;

  const content = await contentService.getContentById(idContent);
  const { name, value } = content;
  const jsonMessage = {
    embed: {
      color: 3447003,
      title: shortcutFound,
      fields: [
        {
          name: '..' + name.toUpperCase(),
          value: value,
          inline: false,
        },
        {
          name: updateCardTitle,
          value: updateCardText,
          inline: false,
        },
        {
          name: deleteCardTitle,
          value: deleteCardText,
          inline: false,
        },
        {
          name: finishCardTitle,
          value: finishCardText,
          inline: false,
        },
      ],
    },
  };
  const messageSent = await event.message.channel.send(jsonMessage);
  await guildService.setCurrentShortCut(
    client,
    idGuild,
    true,
    idContent,
    messageSent.id,
    messageSent.channel.id,
    'update_selectoption'
  );
  messageSent.react('1️⃣');
  messageSent.react('2️⃣');
  messageSent.react('❌');
  messageSent.react('✅');
}

export default deleteContent;
