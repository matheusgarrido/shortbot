import guildModel from '../model/guildModel.js';
import * as contentService from '../service/contentService.js';

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

async function setCurrentShortCut(
  idGuild,
  onCreateOrUpdate,
  idShortcut,
  state
) {
  // console.log(onCreateOrUpdate);
  if (onCreateOrUpdate) {
    const guild = await guildModel.findByIdAndUpdate(
      { _id: idGuild },
      { 'currentShortcut.id': idShortcut, 'currentShortcut.state': state },
      { new: true }
    );
    guild.save();
  } else {
    const guild = await guildModel.findByIdAndUpdate(
      { _id: idGuild },
      { currentShortcut: {} },
      { new: true }
    );
    guild.save();
  }
}
async function cancelCreateOrUpdate(idGuild) {
  const guild = await guildModel.findByIdAndUpdate(
    { _id: idGuild },
    { currentShortcut: {} }
  );
  const { id: idContent } = guild.currentShortcut;
  await contentService.deleteContent(idContent);
  guild.save();
  return guild;
}

async function isOnCreateOrUpdate(idGuild) {
  const guild = await guildModel.findOne(
    { _id: idGuild },
    { currentShortcut: 1 }
  );
  if (guild.currentShortcut.id) return true;
  return false;
}

export {
  getGuild,
  setJoined,
  setRejoined,
  setEjected,
  setRegion,
  setCurrentShortCut,
  cancelCreateOrUpdate,
  isOnCreateOrUpdate,
};
