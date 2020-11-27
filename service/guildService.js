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

async function setCurrentShortCut(
  client,
  idGuild,
  onCreateOrUpdate,
  idShortcut,
  idMessage,
  idChannel,
  state
) {
  let guild = {};
  if (onCreateOrUpdate) {
    guild = await guildModel.findByIdAndUpdate(
      { _id: idGuild },
      {
        'currentShortcut.id': idShortcut,
        'currentShortcut.idMessage': idMessage,
        'currentShortcut.idChannel': idChannel,
        'currentShortcut.state': state,
      }
    );
  } else {
    guild = await guildModel.findByIdAndUpdate(
      { _id: idGuild },
      { currentShortcut: {} }
    );
  }
  //Delete message
  if (
    Object.keys(guild.currentShortcut).length > 0 &&
    guild.currentShortcut.idMessage !== null &&
    guild.currentShortcut.idMessage !== undefined
  ) {
    try {
      const fullMessage = await client.guilds.cache
        .get(idGuild)
        .channels.cache.get(idChannel)
        .messages.cache.get(guild.currentShortcut.idMessage);
      fullMessage.delete();
    } catch (err) {
      console.log(err);
    }
  }
  //Save changes
  guild.save();
  return guild;
}

async function isOnCreateOrUpdate(idGuild) {
  const guild = await guildModel.findById(idGuild);
  if (guild.currentShortcut && guild.currentShortcut.id) return true;
  return false;
}

export {
  getGuild,
  setJoined,
  setRejoined,
  setEjected,
  setRegion,
  setCurrentShortCut,
  isOnCreateOrUpdate,
};
