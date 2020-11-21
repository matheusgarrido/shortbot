import messageModel from '../../model/messageModel.js';

async function helpCommand(event) {
  //Discover language to get messages in DB
  const { region } = event.guild;

  let language = await messageModel.findOne({ countries: region });

  if (!language) await messageModel.findOne({ countries: 'us' });

  //Help guide messages
  const { title, description } = language.messages.help;
  const { list, create, update } = description;

  //String to send
  const messageToSend = `${title.toLocaleUpperCase()}
  :new: **'..create'** - ${create}
  :page_facing_up: **'..list'** -  ${list}
  :pencil: **'..update'** - ${update}`;

  //Message sended
  event.channel.send(messageToSend);
}

export default helpCommand;
