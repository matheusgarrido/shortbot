import * as contentService from '../service/contentService.js';
import * as messageService from '../service/messageService.js';
import * as guildService from '../service/guildService.js';

async function setName(event, message) {
  const { id: idGuild, region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);
  const { nameExisting, nameInvalid, createName } = language.messages.crud;

  //Get name
  const name = message.replace('create', '').trim();

  //If name is empty or not starts with letter
  if (name === '' || !name.charAt(0).match(/^[a-z\u00E0-\u00FC]+$/i)) {
    event.react('❌');
    event.channel.send(nameInvalid);
  }
  //If already exists a shortcut with same name on guild
  else if (await contentService.getContentByName(idGuild, name)) {
    event.react('❌');
    event.channel.send(nameExisting);
  }
  //If it's a shorcut with different name from others on guild
  else {
    event.react('✅');
    await contentService.createContent(idGuild, name);
    event.channel.send(createName);
  }
}

async function setNewShortcutValue(event, message) {
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

export { setName as createCommand, setNewShortcutValue };
