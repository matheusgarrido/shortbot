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
      selectOption:
        'Selecione a opção para atualizar o atalho ou cancele com **..cancel**',
      cancelCreate: 'Criação de atalho cancelada',
      cancelUpdate: 'Atualização de atalho cancelada',
      cancelFalse:
        'Nenhum atalho está sendo criado ou alterado no momento para cancelar uma ação.',
      nameExisting: 'Já existe outro atalho com este nome/comando.',
      nameInvalid: 'O nome informado é inválido.',
      createName:
        'Informe o valor do atalho, **digitando __..__ antes do valor** (exemplo: __..teste__)\nPara cancelar a criação digite ..cancel',
      invalidValue:
        'Informe um valor para o atalho (para cancelar a criação digite ..cancel)',
      createSuccess: 'criado com sucesso!',
      updateSuccess: 'atualizado com sucesso!',
      deleteSuccess: 'Atalho excluído!',
      shortcutFound: 'Atalho encontrado',
      shortcutNotFound:
        'Atalho não encontrado\nDigite ..list para visualizar a lista de atalhos',
      updateCardTitle: 'Atualizar',
      updateCardText: ':one: para alterar nome\n:two: para alterar valor',
      deleteCardTitle: 'Excluir',
      deleteCardText: ':x: para excluir o atalho',
      finishCardTitle: 'Concluir',
      finishCardText: ':white_check_mark: para sair das alterações',
      confirmDeleteTitle: 'Confirmação de Exclusão',
      confirmDeleteText:
        ':white_check_mark: para excluir\n:x: para cancelar exclusão',
      updateDescriptionCreate: 'Aperte 🛑 para cancelar a criação',
      newName:
        'Informe o novo comando para o atalho, **digitando __..__ antes do valor**',
      sameName: 'O nome informado é o mesmo nome que está no momento.',
      updateDescriptionCancel: 'Aperte 🛑 para cancelar a atualização',
      invalidReactionTitle: 'O conteúdo disponível para alteração no momento.',
      invalidReactionText: 'Para obter mais ajuda, digite ..help',
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
        cancel: 'Cancela uma criação ou atualização de atalho.',
        shortcutExample: 'nome do atalho',
        shortcut:
          'Basta substituir a frase destacada pelo nome do atalho para usá-lo.',
      },
    },
    join: {
      firstIn:
        'Obrigado por me convidar ao grupo! :grin:\nPara aprender um pouco mais dos meus comandos, digite **..help**.',
      notFirstIn:
        'Obrigado por me adicionar de volta! \nSeus atalhos ainda estão salvos, digite **..list** para exibi-los.',
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
