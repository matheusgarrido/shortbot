import * as guildService from "../service/guildService.js";
import * as contentService from "../service/contentService.js";

async function reactMessage(client, event, user) {
  /*Continue:
  If the message is from the shortbot
  And if the reaction is not from the shortbot
  */
  if (
    event.message.author.id === client.user.id &&
    client.user.id !== user.id
  ) {
    const { channel } = event.message;
    const emoji = event._emoji.name;
    const idGuild = event.message.channel.guild.id;
    const guild = await guildService.getGuild(idGuild);

    const { id: idContent, state } = guild.currentShortcut;
    const content = await contentService.getContentById(idContent);

    //If content exists
    if (content) {
      //Delete menu
      if (state === "update_delete") {
        switch (emoji) {
          //Abort delete
          case "❌":
            await guildService.setCurrentShortCut(idGuild, false);
            channel.send("Exclusão cancelada");
            break;
          //Confirm delete
          case "✅":
            await guildService.setCurrentShortCut(idGuild, false);
            await contentService.deleteContent(idContent);
            channel.send("Atalho excluído!");
            break;
          //Another reaction
          default:
            channel.send(
              "Reação inválida.\nSelecione uma das opções listadas no menu."
            );
            break;
        }
      }
      //If started update or is in name/value update
      else if (
        state === "update_name" ||
        state === "update_value" ||
        state === "'update_selectoption'"
      ) {
        switch (emoji) {
          //Update name
          case "1️⃣":
            await guildService.setCurrentShortCut(
              idGuild,
              true,
              idContent,
              "update_name"
            );
            channel.send("Atualizar nome");
            break;
          //Update value
          case "2️⃣":
            await guildService.setCurrentShortCut(
              idGuild,
              true,
              idContent,
              "update_value"
            );
            channel.send("Alterar valor");
            break;
          //Delete shortcut
          case "❌":
            await guildService.setCurrentShortCut(
              idGuild,
              true,
              idContent,
              "update_delete"
            );
            const messageSent = await channel.send(
              "✅ to delete\n❌ to cancel delete"
            );
            messageSent.react("✅");
            messageSent.react("❌");
            break;
          //Another reaction
          default:
            channel.send(
              "Reação inválida.\nSelecione uma das opções listadas no menu."
            );
            break;
        }
      }
    }
    //Not found in guild.currentShortcut
    else {
      channel.send(
        "O conteúdo não está mais disponível para alteração no momento.\nCaso deseje alterá-lo, digite ..update seguido do nome."
      );
    }
  }
}

export default reactMessage;
