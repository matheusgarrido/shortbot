import * as contentService from "../service/contentService.js";

async function listCommand(event) {
  const { id, name } = event.guild;
  const content = await contentService.getContentByGuildId(id);
  let text = "";
  const jsonMessage = {
    embed: {
      color: 3447003,
      title: `Atalhos da Guilda (${name})`,
      fields: [],
    },
  };
  content.forEach((contentsByType) => {
    let message = "";
    for (const shortcut of contentsByType.shortcuts) {
      const { idUser, idGuild, name, type, value, privacity } = shortcut;
      message += `__${name}__ = ${value}\n`;
    }
    jsonMessage.embed.fields.push({
      name: contentsByType.type.toUpperCase(),
      value: message,
      inline: true,
    });
  });
  event.channel.send(jsonMessage);
  console.log(content);
}
export default listCommand;
