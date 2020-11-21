import guildModel from '../model/guildModel.js';

async function getGuild(guildId) {
  const guild = await guildModel.findById({ _id: guildId });
  return guild;
}

async function setJoined(guildId, region) {
  const guild = await guildModel.create({ _id: guildId, region: region });
  guild.save();
}

async function setRejoined(guildId, region) {
  const guild = await guildModel.findByIdAndUpdate(
    { _id: guildId },
    { state: true, region }
  );
  guild.save();
}

async function setEjected(guildId) {
  const guild = await guildModel.findByIdAndUpdate(
    { _id: guildId },
    { state: false }
  );
  guild.save();
}

async function setRegion(guildId, region) {
  const guild = await getGuild(guildId);
  if (guild.region !== region) {
    await guild.updateOne({ region });
    guild.save();
  }
}

export { getGuild, setJoined, setRejoined, setEjected, setRegion };
