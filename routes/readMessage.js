import * as guildService from "../service/guildService.js";
import * as messageService from "../service/messageService.js";
import * as contentService from "../service/contentService.js";
import helpCommand from "../helper/helpCommand.js";
import listCommand from "../helper/listCommand.js";
import { createCommand, setNewShortcutValue } from "../helper/createCommand.js";
import { startUpdate, updateShortcutValue } from "../helper/updateCommand.js";
import executeShortcut from "../helper/executeShortcut.js";

async function readMessage(client, event) {
  const { content } = event;
  const contentSplitted = content.trim().split("..");

  const { id, region } = event.guild;

  const guildData = await guildService.getGuild(id);
  const state =
    Object.keys(guildData.currentShortcut).length !== 0
      ? guildData.currentShortcut.state
      : "_";
  const stateCommand = state.split("_");
  /* Do:
    If has content after the prefix
    If is blank before the prefix
    If content start with letter */
  if (
    contentSplitted.length > 1 &&
    !contentSplitted[0] &&
    (contentSplitted[1]
      .trim()
      .charAt(0)
      .match(/^[a-z\u00E0-\u00FC]+$/i) ||
      ["value"].includes(stateCommand[1]))
  ) {
    const message = content.substr(2).trim();
    const command = message.split(" ")[0];

    //Get messages
    let language = await messageService.getMessagesByRegion(region);
    const {
      reserved,
      selectOption,
      cancelUpdate,
      cancelCreate,
      cancelFalse,
    } = language.messages.crud;
    //List all help functions
    if (command.toLowerCase() === "help") {
      helpCommand(event);
    }
    //If nobody in guild is creating or updating a shortcut
    else if (!(await guildService.isOnCreateOrUpdate(id)))
      switch (command.toLowerCase()) {
        case "list":
          //List all shortcuts
          listCommand(event, message);
          break;
        case "create":
          //Create a new shortcut
          createCommand(event, message);
          break;
        case "update":
          startUpdate(event, message);
          //Update an exist shortcut or delete it
          break;
        case "cancel":
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
        case "list":
        case "create":
        case "update":
          //If is in update select option menu
          if (["selectoption"].includes(stateCommand[1])) {
            event.channel.send(selectOption);
          }
          //If is the shortcut value
          else if (["value"].includes(stateCommand[1])) {
            //Get value to finish creating or update an existing shortcut
            stateCommand[0] === "create"
              ? setNewShortcutValue(event, message)
              : console.log("EDIT");
          }
          //If is the name
          else event.channel.send(reserved);
          break;
        case "cancel":
          const guild = await guildService.setCurrentShortCut(id, false);
          //Delete shortcut draft if is canceling in creation
          if (stateCommand[0] === "create") {
            event.channel.send(cancelCreate);
            await contentService.deleteContent(guild.currentShortcut.id);
          }
          //Just cancel if is in update
          else {
            event.channel.send(cancelUpdate);
          }
          break;
        default:
          stateCommand[0] === "create"
            ? setNewShortcutValue(event, message)
            : console.log("EDIT");
      }
    }
    //Try update region if necessary
    guildService.setRegion(id, region);
  }
}

export default readMessage;
