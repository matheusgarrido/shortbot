import contentModel from "../model/contentModel.js";
import * as guildService from "../service/guildService.js";

const c = {
  idUser: "252440678955483138",
  idGuild: "722159579215036458",
  name: "Teste",
  type: "text",
  value: "/tts teste",
  privacity: "private",
};

const c2 = {
  idUser: "252440678955483138",
  idGuild: "722159579215036458",
  name: "Teste2",
  type: "text",
  value: "/tts teste2",
  privacity: "private",
};

async function getContentByGuildId(idGuild, typeName) {
  const conditionFind = typeName
    ? {
        idGuild,
        type: typeName,
      }
    : { idGuild };
  const typesInGuild = await contentModel.distinct("type", conditionFind);
  const arrayContent = [];
  for (const type of typesInGuild) {
    const content = await contentModel
      .find({ idGuild, type })
      .sort({ name: 1 });
    arrayContent.push({ type, shortcuts: content });
  }
  return arrayContent;
}
async function getContentByName(idGuild, name) {
  const content = await contentModel.findOne({
    idGuild,
    name: name.toLowerCase(),
  });
  return content;
}
async function getContentById(id) {
  const content = await contentModel.findById(id);
  return content;
}
async function setValueById(client, id, value) {
  const content = await contentModel.findByIdAndUpdate(id, { value });
  await guildService.setCurrentShortCut(client, content.idGuild, false);
  return content;
}

async function createContent(client, idGuild, name) {
  const content = await contentModel.create({
    idGuild,
    name: name.toLowerCase(),
  });
  content.save();
  const { _id } = content;
  await guildService.setCurrentShortCut(
    client,
    idGuild,
    true,
    _id,
    null,
    null,
    "create_value"
  );
  return content;
}

async function deleteContent(id) {
  await contentModel.findByIdAndDelete(id);
}

// createContent(c);
// createContent(c2);

export {
  getContentByGuildId,
  getContentByName,
  getContentById,
  createContent,
  deleteContent,
  setValueById,
};
