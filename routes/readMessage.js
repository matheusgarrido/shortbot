import guildModel from '../model/guildModel.js';
import helpCommand from '../helper/commands/helpCommand.js';

async function readMessage(client, event) {
    const { content } = event;
    const contentSplitted = content.split('..');
    if (contentSplitted.length > 1 && !contentSplitted[0]) {
        const message = content.substr(2).trim();
        const command = message.split(' ')[0];
        console.log(command);
        switch(command){
            case 'help':
                helpCommand(event);
                break;
        }
    }
}

export default readMessage;
