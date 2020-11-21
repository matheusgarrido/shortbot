import * as contentService from '../service/contentService.js';

async function listCommand(event) {
  const { id } = event.guild;
  const content = await contentService.getContentByGuildId(id);
  let text = '';
  // content.forEach((element) => {
  //   const { idUser, idGuild, name, type, value, privacity } = element;
  //   text += `${name} - ${value} (${type})\n`;
  // });
  // event.channel.send(text);
}
export default listCommand;
