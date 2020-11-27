import * as contentService from '../service/contentService.js';
import * as messageService from '../service/messageService.js';
import * as guildService from '../service/guildService.js';

//Set to update state when typed ..update
async function startUpdate(client, event, message) {
  const { id: idGuild, region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);
  const { nameInvalid, shortcutNotFound } = language.messages.crud;

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
      returnToUpdate(client, content._id, event.guild, event.channel);
    }
    //If shortcut wasn't found
    else {
      event.react('❌');
      event.channel.send(shortcutNotFound);
    }
  }
}

//Show update menu when starts update or after cancel a update method/delete
async function returnToUpdate(client, idContent, guild, channel) {
  // async function returnToUpdate(client, event, idContent) {
  const { id: idGuild, region } = guild;
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
  const messageSent = await channel.send(jsonMessage);
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

//Listen emoji reactions in initial menu option
async function menuOptionUpdate(event, guild, client) {
  const { channel } = event.message;
  const emoji = event._emoji.name;
  const idGuild = guild._id;
  const { id: idContent } = guild.currentShortcut;
  const { region } = event.message.guild;
  let language = await messageService.getMessagesByRegion(region);
  const {
    createName,
    confirmDeleteTitle,
    confirmDeleteText,
    newName,
    updateDescriptionCancel,
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
      jsonMessage.embed.description = updateDescriptionCancel;
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
      newMessage.react('🛑');
      break;
    //Update value
    case '2️⃣':
      jsonMessage.embed.title = createName;
      jsonMessage.embed.description = updateDescriptionCancel;
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
      newMessage.react('🛑');
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
//Update the shortcut name, the command
async function updateShortcutName(client, event, message) {
  const { id: idGuild, region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);
  const {
    invalidValue,
    updateSuccess,
    sameName,
    nameExisting,
  } = language.messages.crud;

  const guild = await guildService.getGuild(idGuild);
  const { id } = guild.currentShortcut;
  const content = await contentService.getContentById(id);
  const { name, type } = content;
  //Get name
  const newName = message.trim();

  //If name is empty
  if (newName === '') {
    event.react('❌');
    event.channel.send(invalidValue);
  } else if (newName === name) {
    event.react('❌');
    event.channel.send(sameName);
  } else {
    try {
      const contentWithSameName = await contentService.getContentByName(
        idGuild,
        newName
      );
      //If already exists this name
      if (Object.keys(contentWithSameName).length > 0) {
        event.react('❌');
        event.channel.send(nameExisting);
      }
      //If it's a shorcut with different name from others on guild
    } catch (err) {
      event.react('✅');
      await contentService.setNameById(client, id, newName, idGuild);
      event.channel.send(`**__..${name}__** ${updateSuccess}`);
      returnToUpdate(client, id, event.channel.guild, event.channel);
    }
  }
}

//Update the shortcut value, the content
async function updateShortcutValue(client, event, message) {
  const { id: idGuild, region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);
  const { invalidValue, updateSuccess } = language.messages.crud;

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
    event.channel.send(`**__..${name}__** ${updateSuccess}`);
    returnToUpdate(client, id, event.channel.guild, event.channel);
  }
}

export {
  startUpdate,
  menuOptionUpdate,
  updateShortcutValue,
  updateShortcutName,
  returnToUpdate,
};
