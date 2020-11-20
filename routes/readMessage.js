import guildModel from '../model/guildModel.js';
import helpCommand from '../helper/commands/helpCommand.js';

async function readMessage(client, event) {
    console.log(event.guild.region);
    const { content } = event;
    const contentSplitted = content.split('..');
    if (contentSplitted.length > 1 && !contentSplitted[0]) {
        const message = content.substr(2).trim();
        const command = message.split(' ')[0];
        console.log(command);
        switch(command){
            case 'help':
                //List all help functions
                helpCommand(event);
                break;
            case 'list':
                //List all shortcuts
                break;
            case 'create':
                //Create a new shortcut
                break;
            case 'update':
                //Update an exist shortcut or delete it
                break;
            default:
                //Search a shortcut in DB
                break;
        }
    }
}

export default readMessage;
