import contentModel from '../model/contentModel.js';

const c = {
  idUser: '252440678955483138',
  idGuild: '722159579215036458',
  name: 'Teste',
  type: 'text',
  value: '/tts teste',
  privacity: 'private',
};

const c2 = {
  idUser: '252440678955483138',
  idGuild: '722159579215036458',
  name: 'Teste2',
  type: 'text',
  value: '/tts teste2',
  privacity: 'private',
};

async function getContentByGuildId(guildId) {
  const typesInGuild = await contentModel.distinct('type', {
    idGuild: guildId,
  });
  //Not updating array
  let arrayContent = [];
  await typesInGuild.forEach(async (element) => {
    const content = await contentModel
      .find({ idGuild: guildId, type: element })
      .sort({ name: 1 });
    arrayContent.push(content);
  });

  console.log(arrayContent);
  // const content = await contentModel
  //   .find({ idGuild: guildId })
  //   .sort({ type: 1 });
  // return content;
}

async function createContent(dataContent) {
  const content = await contentModel.create(dataContent);
  content.save();
}

// createContent(c);
// createContent(c2);

export { getContentByGuildId, createContent };
