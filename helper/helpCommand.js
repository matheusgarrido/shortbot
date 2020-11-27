import * as messageService from '../service/messageService.js';

async function helpCommand(event) {
  //Discover language to get messages in DB
  const { region } = event.guild;
  let language = await messageService.getMessagesByRegion(region);

  //Help guide messages
  const { title, description } = language.messages.help;
  const {
    list,
    create,
    update,
    cancel,
    shortcutExample,
    shortcut,
  } = description;

  //String to send
  const jsonMessage = {
    embed: {
      color: 3447003,
      title: title.toLocaleUpperCase(),
      fields: [
        {
          name: ":new: **'..create'**",
          value: create,
          inline: false,
        },
        {
          name: ":page_facing_up: **'..list'**",
          value: list,
          inline: false,
        },
        {
          name: ":pencil: **'..update'**",
          value: update,
          inline: false,
        },
        {
          name: ":x: **'..cancel'**",
          value: cancel,
          inline: false,
        },
        {
          name: `:arrow_forward: **'..__${shortcutExample}__'**`,
          value: shortcut,
          inline: false,
        },
      ],
    },
  };

  //Message sended
  event.channel.send(jsonMessage);
}

export default helpCommand;
