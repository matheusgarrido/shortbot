async function helpCommand(event) {
  const helpTextsContent = {
    title: "Guia de Comandos".toLocaleUpperCase(),
    description: {
      list: "Lista todos os atalhos criados pelos usuários do servidor.",
      create: "Cria um novo atalho.",
      update: "Gerenciamento de atalho (atualização ou exclusão).",
    },
  };
  const { title, description } = helpTextsContent;
  const messageToSend = `${title}
:new: **'..create'** - ${description.create}
:page_facing_up: **'..list'** -  ${description.list}
:pencil: **'..update'** - ${description.update}`;

  event.channel.send(messageToSend);
}

export default helpCommand;
