import messageModel from '../model/messageModel.js';

const json = {
  language: 'portuguese',
  countries: ['brazil'],
  messages: {
    help: {
      title: 'Guia de Comandos',
      description: {
        list: 'Lista todos os atalhos criados pelos usuários do servidor.',
        create: 'Cria um novo atalho.',
        update: 'Gerenciamento de atalho (atualização ou exclusão).',
        shortcutExample: 'nome do atalho',
        shortcut:
          'Basta substuituir a frase destacada pelo nome do atalho para usá-lo.',
      },
    },
  },
};

const allRegions = [
  'brazil',
  'eu-central',
  'europe',
  'hongkong',
  'india',
  'japan',
  'russia',
  'singapore',
  'southafrica',
  'sydney',
  'us-central',
  'us-east',
  'us-south',
  'us-west',
];

async function getMessagesByRegion(region) {
  // const guild = await guildModel.findOne({ _id: guildId });
  // return guild;
}

async function setMessages() {
  const message = await messageModel.create(json);
  message.save();
}

export { setMessages };
