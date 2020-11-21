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

async function getContentByGuildId(guildId) {
  const typesInGuild = await contentModel.distinct("type", {
    idGuild: guildId,
  });
  const arrayContent = [];
  for (const type of typesInGuild) {
    const content = await contentModel
      .find({ idGuild: guildId, type })
      .sort({ name: 1 });
    arrayContent.push({ type, shortcuts: content });
  }
  return arrayContent;
}

async function createContent(dataContent) {
  const content = await contentModel.create(dataContent);
  content.save();
}

// createContent(c);
// createContent(c2);

export { getContentByGuildId, createContent };
