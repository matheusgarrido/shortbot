import * as guildService from '../service/guildService.js';

async function joinedGuild(client, event) {
  //Data from welcome channel
  const { id: guildId } = event;
  //Create or update guild
  const guild = await guildService.getGuild(guildId);
  const channel = client.channels.cache.get(mainChannelId);
  if (guild) {
    //Send a update message
    await guildService.setRejoined(guildId);
    channel.send('Você me perdoou!');
  } else {
    //Send a create message
    await guildService.setJoined(guildId);
    channel.send('Obrigado por me adicionar!');
  }
}

export default joinedGuild;
