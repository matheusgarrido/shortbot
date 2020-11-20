import guildModel from '../model/guildModel.js';

async function getGuild(guildId){
    const guild = await guildModel.findById({ _id: guildId });
    return guild;
}

async function setJoined(guildId, region){
    await guildModel.create({ _id: guildId, region });
    guildModel.save();
}

async function setRejoined(guildId, region ){
    await guildModel.findByIdAndUpdate({ _id: guildId }, { state: true, region });
    guildModel.save();
}

async function setEjected(guildId){
    await guildModel.findByIdAndUpdate({ _id: guildId }, { state: false });
    guildModel.save();
}


export { getGuild, setJoined, setRejoined, setEjected };