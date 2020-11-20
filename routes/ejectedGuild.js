import guildModel from '../model/guildModel.js';

async function ejectedGuild(client, event) {
  const { id: guildId } = event;

  //Desable guild
  await guildModel.findByIdAndUpdate({ _id: guildId }, { state: false });
  guildModel.save();
}

export default ejectedGuild;
