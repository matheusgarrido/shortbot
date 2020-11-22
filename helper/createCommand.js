import * as contentService from '../service/contentService.js';
import * as messageService from '../service/messageService.js';

async function setName(event, message) {
  const { id: idGuild, region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);
  const { nameExisting, nameInvalid } = language.messages.crud;

  //Get name
  const name = message.replace('create', '').trim();

  //If name is empty
  if (name === '') {
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
    event.channel.send(`Nome do atalho: __..${name}__`);
  }
}

export { setName as createCommand };
