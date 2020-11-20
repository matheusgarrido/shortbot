import guildModel from "../model/guildModel.js";

async function getGuild(guildId) {
  const guild = await guildModel.findById({ _id: guildId });
  return guild;
}

async function setJoined(guildId, region) {
  await guildModel.create({ _id: guildId, region });
  guildModel.save();
}

async function setRejoined(guildId, region) {
  await guildModel.findByIdAndUpdate({ _id: guildId }, { state: true, region });
  guildModel.save();
}

async function setEjected(guildId) {
  await guildModel.findByIdAndUpdate({ _id: guildId }, { state: false });
  guildModel.save();
}

async function setRegion(guildId, region) {
  const guild = await guildModel.findById(guildId);
  if (guild.region !== region) {
    await guild.update({ region });
    guild.save();
  } else {
    console.log("A guilda já está atualizada.");
  }
}

export { getGuild, setJoined, setRejoined, setEjected, setRegion };
