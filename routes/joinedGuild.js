import guildModel from '../model/guildModel.js';

async function joinedGuild(client, event) {
  //Data from welcome channel
  const { id: guildId } = event;
  //Create or update guild
  const guild = await guildModel.findById({ _id: guildId, state: true });
  const channel = client.channels.cache.get(mainChannelId);
  if (guild) {
    //Send a update message
    await guildModel.findByIdAndUpdate({ _id: guildId }, { state: true });
    channel.send('Você me perdoou!');
  } else {
    //Send a create message
    await guildModel.create({ _id: guildId });
    channel.send('Obrigado por me adicionar!');
  }
  guildModel.save();
}

export default joinedGuild;
