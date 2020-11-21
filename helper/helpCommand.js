import * as messageService from "../service/messageService.js";

async function helpCommand(event) {
  //Discover language to get messages in DB
  const { region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);

  //Help guide messages
  const { title, description } = language.messages.help;
  const { list, create, update, shortcutExample, shortcut } = description;

  //String to send
  const messageToSend = `${title.toLocaleUpperCase()}
:new: **'..create'** - ${create}
:page_facing_up: **'..list'** -  ${list}
:pencil: **'..update'** - ${update}
:arrow_forward: **'..__${shortcutExample}__'** - ${shortcut}`;

  //Message sended
  event.channel.send(messageToSend);
}

export default helpCommand;
