import contentModel from "../model/contentModel.js";

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
    name: { $regex: name, $options: "si" },
  });
  return content;
}

async function createContent(dataContent) {
  const content = await contentModel.create(dataContent);
  content.save();
}

// createContent(c);
// createContent(c2);

export { getContentByGuildId, getContentByName, createContent };
