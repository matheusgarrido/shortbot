import * as guildService from "../service/guildService.js";
import helpCommand from "../helper/helpCommand.js";
import listCommand from "../helper/listCommand.js";

async function readMessage(client, event) {
  const { content } = event;
  const contentSplitted = content.trim().split("..");
  /* Do:
    If has content after the prefix
    If is blank before the prefix
    If content start with letter */
  if (
    contentSplitted.length > 1 &&
    !contentSplitted[0] &&
    contentSplitted[1].charAt(0).match(/^[a-z\u00E0-\u00FC]+$/i)
  ) {
    const message = content.substr(2).trim();
    const command = message.split(" ")[0];
    switch (command.toLowerCase()) {
      case "help":
        //List all help functions
        helpCommand(event);
        break;
      case "list":
        //List all shortcuts
        listCommand(event, message);
        break;
      case "create":
        //Create a new shortcut
        break;
      case "update":
        //Update an exist shortcut or delete it
        break;
      default:
        //Search a shortcut in DB
        break;
    }
    //Try update region if necessary
    const { id, region } = event.guild;
    guildService.setRegion(id, region);
  }
}

export default readMessage;
