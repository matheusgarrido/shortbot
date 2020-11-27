import * as guildService from '../service/guildService.js';
import * as messageService from '../service/messageService.js';

async function joinedGuild(client, event) {
  //Data from welcome channel
  const { id: guildId, systemChannelID: mainChannelId, region } = event;
  //Create or update guild
  const guild = await guildService.getGuild(guildId);
  const channel = client.channels.cache.get(mainChannelId);

  let language = await messageService.getMessagesByRegion(region);
  const { firstIn, notFirstIn } = language.messages.join;

  //Help guide messages
  if (guild) {
    //Send a update message
    await guildService.setRejoined(guildId, region);
    channel.send(notFirstIn);
  } else {
    //Send a create message
    await guildService.setJoined(guildId, region);
    channel.send(firstIn);
  }
}

export default joinedGuild;
