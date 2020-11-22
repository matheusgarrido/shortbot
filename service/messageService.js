import messageModel from '../model/messageModel.js';

const json = {
  language: 'portuguese',
  countries: ['brazil'],
  contentType: [
    {
      name: 'text',
      value: 'Texto',
    },
    {
      name: 'image',
      value: 'Imagem',
    },
  ],
  messages: {
    crud: {
      reserved:
        'Você não pode utilizar esta palavra para salvar no atalho porque eu já uso ela para executar funções.',
      cancelCreate: 'Criação de atalho cancelada',
      cancelUpdate: 'Atualização de atalho cancelada',
      cancelFalse:
        'Nenhum atalho está sendo criado ou alterado no momento para cancelar uma ação.',
      nameExisting: 'Já existe um atalho com este nome.',
      nameInvalid: 'O nome informado é inválido.',
      createName:
        'Informe o valor do atalho, **digitando __..__ antes do valor** (exemplo: __..teste__)\nPara cancelar a criação digite ..cancel',
      invalidValue:
        'Informe um valor para o atalho (para cancelar a criação digite ..cancel)',
      createSuccess: 'criado com sucesso!',
    },
    content: {
      notFound: 'Nenhum atalho encontrado.',
    },
    list: {
      title: 'Atalhos salvos na Guilda',
      emptyTitle: 'Não há atalhos salvos',
      emptyMessage: 'Utilize o comando **__..create__** para criar um atalho.',
    },
    help: {
      title: 'Guia de Comandos',
      description: {
        list: 'Lista todos os atalhos criados pelos usuários do servidor.',
        create: 'Cria um novo atalho.',
        update: 'Gerenciamento de atalho (atualização ou exclusão).',
        shortcutExample: 'nome do atalho',
        shortcut:
          'Basta substituir a frase destacada pelo nome do atalho para usá-lo.',
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
  let language = await messageModel.findOne({ countries: region });
  if (!language) language = await messageModel.findOne({ countries: 'europe' });
  return language;
}

async function setMessages() {
  const message = await messageModel.create(json);
  message.save();
}

// setMessages();

export { getMessagesByRegion };
