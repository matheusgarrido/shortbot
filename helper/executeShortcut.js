import * as contentService from "../service/contentService.js";
import * as messageService from "../service/messageService.js";

async function executeShortcut(event, message) {
  const { id, region } = event.guild;
  //Get list messages
  let language = await messageService.getMessagesByRegion(region);
  const { notFound } = language.messages.content;
  //Get content
  const content = await contentService.getContentByName(id, message);

  if (content) {
    event.react("✅");
    const { value, type } = content;
    // prettier-ignore
    switch (type) {
      //If is text
      case "text":
        //If has a TTS command
        if (value.substr(0, 5) === "/tts ")
          event.channel.send(value.substr(5), {
            tts: true,
          });
        //Just a text
        else event.channel.send(value);
        break;
    }
  } else {
    event.react("❌");
    event.channel.send(notFound);
  }
}
export default executeShortcut;
