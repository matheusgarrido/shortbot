import * as contentService from '../service/contentService.js';
import * as messageService from '../service/messageService.js';
import * as guildService from '../service/guildService.js';

async function startUpdate(client, event, message) {
  const { id: idGuild, region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);
  const {
    nameExisting,
    nameInvalid,
    createName,
    shortcutFound,
    shortcutNotFound,
    updateCardTitle,
    updateCardText,
    deleteCardTitle,
    deleteCardText,
    finishCardTitle,
    finishCardText,
  } = language.messages.crud;

  //Get name
  const name = message.replace('update', '').trim();

  //If name is empty or not starts with letter
  if (name === '' || !name.charAt(0).match(/^[a-z\u00E0-\u00FC]+$/i)) {
    event.react('❌');
    event.channel.send(nameInvalid);
  }
  //If already exists a shortcut with same name on guild
  else {
    const content = await contentService.getContentByName(idGuild, name);
    if (content) {
      event.react('✅');
      const { _id, name, value } = content;
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
      const messageSent = await event.channel.send(jsonMessage);
      await guildService.setCurrentShortCut(
        client,
        idGuild,
        true,
        content._id,
        messageSent.id,
        messageSent.channel.id,
        'update_selectoption'
      );
      messageSent.react('1️⃣');
      messageSent.react('2️⃣');
      messageSent.react('❌');
      messageSent.react('✅');
    }
    //If it's a shorcut with different name from others on guild
    else {
      event.react('❌');
      event.channel.send(shortcutNotFound);
    }
  }
}

async function menuOptionUpdate(event, guild, client) {
  const { channel } = event.message;
  const emoji = event._emoji.name;
  const idGuild = guild._id;
  const { id: idContent } = guild.currentShortcut;
  const { region } = event.message.guild;
  let language = await messageService.getMessagesByRegion(region);
  const {
    cancelUpdate,
    createName,
    confirmDeleteTitle,
    confirmDeleteText,
    newName,
  } = language.messages.crud;
  let newMessage = '';
  const jsonMessage = {
    embed: {
      color: 3447003,
    },
  };
  switch (emoji) {
    //Update name
    case '1️⃣':
      jsonMessage.embed.title = newName;
      newMessage = await channel.send(jsonMessage);
      await guildService.setCurrentShortCut(
        client,
        idGuild,
        true,
        idContent,
        newMessage.id,
        newMessage.channel.id,
        'update_name'
      );
      break;
    //Update value
    case '2️⃣':
      jsonMessage.embed.title = createName;
      newMessage = await channel.send(jsonMessage);
      await guildService.setCurrentShortCut(
        client,
        idGuild,
        true,
        idContent,
        newMessage.id,
        newMessage.channel.id,
        'update_value'
      );
      break;
    //Delete shortcut
    case '❌':
      jsonMessage.embed.title = confirmDeleteTitle;
      jsonMessage.embed.fields = [
        {
          name: 'Selecione',
          value: confirmDeleteText,
          inline: false,
        },
      ];
      newMessage = await channel.send(jsonMessage);
      await guildService.setCurrentShortCut(
        client,
        idGuild,
        true,
        idContent,
        newMessage.id,
        newMessage.channel.id,
        'update_delete'
      );
      newMessage.react('✅');
      newMessage.react('❌');
      break;
    case '✅':
    default:
      channel.send(cancelUpdate);
      await guildService.setCurrentShortCut(
        client,
        idGuild,
        false,
        null,
        null,
        event.message.channel.id
      );
      break;
  }
}

async function updateShortcutValue(client, event, message) {
  const { id: idGuild, region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);
  const { invalidValue, createSuccess } = language.messages.crud;

  const guild = await guildService.getGuild(idGuild);
  const { id } = guild.currentShortcut;
  const content = await contentService.getContentById(id);
  const { name, type } = content;
  //Get value
  const value = message.trim();

  //If value is empty
  if (value === '') {
    event.react('❌');
    event.channel.send(invalidValue);
  }
  //If it's a shorcut with different name from others on guild
  else {
    event.react('✅');
    await contentService.setValueById(client, id, value);
    event.channel.send(`**__..${name}__** ${createSuccess}`);
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

export { startUpdate, menuOptionUpdate, updateShortcutValue, returnToUpdate };
