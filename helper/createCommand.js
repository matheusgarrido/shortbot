import * as contentService from "../service/contentService.js";
import * as messageService from "../service/messageService.js";

async function setName(event, message) {
  const { region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);

  //Get name
  const name = message.replace("create", "").trim();

  event.channel.send(`Nome do atalho: __..${name}__`);
}

export { setName as createCommand };
