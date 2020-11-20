import * as guildService from '../service/guildService.js';

async function ejectedGuild(client, event) {
  const { id: guildId } = event;
  
  //Desable guild
  await guildService.setEjected(guildId);
}

export default ejectedGuild;
