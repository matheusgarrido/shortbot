import * as contentService from '../service/contentService.js';
import * as messageService from '../service/messageService.js';
import * as guildService from '../service/guildService.js';

async function startUpdate(event, message) {
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
              value: updateCardTitle,
              inline: false,
            },
            {
              name: deleteCardTitle,
              value: deleteCardText,
              inline: false,
            },
          ],
        },
      };
      const messageSent = await event.channel.send(jsonMessage);
      messageSent.react('1️⃣');
      messageSent.react('2️⃣');
      messageSent.react('❌');
      await guildService.setCurrentShortCut(
        idGuild,
        true,
        content._id,
        'update_selectoption'
      );
    }
    //If it's a shorcut with different name from others on guild
    else {
      event.react('❌');
      event.channel.send(shortcutNotFound);
    }
  }
}

async function updateContent(event, message) {
  const { id: idGuild, region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);
  // const { invalidValue, createSuccess } = language.messages.crud;

  const guild = await guildService.getGuild(idGuild);
  const { id } = guild.currentShortcut;
  const content = await contentService.getContentById(id);
  const { name, type } = content;
}

async function updateShortcutValue(event, message) {
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
    await contentService.setValueById(id, value);
    event.channel.send(`**__..${name}__** ${createSuccess}`);
  }
}

export { startUpdate, updateShortcutValue };
