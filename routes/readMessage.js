import * as guildService from '../service/guildService.js';
import * as messageService from '../service/messageService.js';
import helpCommand from '../helper/helpCommand.js';
import listCommand from '../helper/listCommand.js';
import { createCommand } from '../helper/createCommand.js';
import executeShortcut from '../helper/executeShortcut.js';

async function readMessage(client, event) {
  const { content } = event;
  const contentSplitted = content.trim().split('..');
  /* Do:
    If has content after the prefix
    If is blank before the prefix
    If content start with letter */
  if (
    contentSplitted.length > 1 &&
    !contentSplitted[0] &&
    contentSplitted[1]
      .trim()
      .charAt(0)
      .match(/^[a-z\u00E0-\u00FC]+$/i)
  ) {
    const message = content.substr(2).trim();
    const command = message.split(' ')[0];

    //Get messages
    const { id, region } = event.guild;
    let language = await messageService.getMessagesByRegion(region);
    const {
      reserved,
      cancelUpdate,
      cancelCreate,
      cancelFalse,
    } = language.messages.crud;

    //List all help functions
    if (command.toLowerCase() === 'help') {
      helpCommand(event);
    }
    //If nobody in guild is creating or updating a shortcut
    else if (!(await guildService.isOnCreateOrUpdate(event.guild.id)))
      switch (command.toLowerCase()) {
        case 'list':
          //List all shortcuts
          listCommand(event, message);
          break;
        case 'create':
          //Create a new shortcut
          createCommand(event, message);
          break;
        case 'update':
          //Update an exist shortcut or delete it
          break;
        case 'cancel':
          //Update an exist shortcut or delete it
          event.channel.send(cancelFalse);
          break;
        default:
          //Search a shortcut in DB
          executeShortcut(event, message);
          break;
      }
    else {
      switch (command) {
        case 'list':
        case 'create':
        case 'update':
          event.channel.send(reserved);
          break;
        case 'cancel':
          event.channel.send(cancelCreate);
          event.channel.send(cancelUpdate);
          break;
      }
    }
    //Try update region if necessary
    guildService.setRegion(id, region);
  }
}

export default readMessage;
