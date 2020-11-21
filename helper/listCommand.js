import * as contentService from "../service/contentService.js";
import * as messageService from "../service/messageService.js";

function getTypeName(typeName, list) {
  for (const type of list) {
    if (type.name === typeName) return type.value;
  }
}

async function listCommand(event, message) {
  //Get list messages
  const { region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);

  //Get title and types in idiom of region
  const { title } = language.messages.list;
  const typeListName = language.contentType;

  //Get guild content
  const { id, name } = event.guild;
  const content = await contentService.getContentByGuildId(id);

  //Formatting message to send
  const jsonMessage = {
    embed: {
      color: 3447003,
      title: `${title} (${name})`,
      fields: [],
    },
  };

  content.forEach((contentsByType) => {
    let textToValueJson = "";
    for (const shortcut of contentsByType.shortcuts) {
      const { idUser, idGuild, name, type, value, privacity } = shortcut;
      if (type === "text") textToValueJson += `__${name}__ = ${value}\n`;
      else textToValueJson += `__${name}__\n`;
    }
    jsonMessage.embed.fields.push({
      name: getTypeName(contentsByType.type, typeListName).toUpperCase(),
      value: textToValueJson,
      inline: true,
    });
  });
  event.channel.send(jsonMessage);
  console.log(content);
}
export default listCommand;
