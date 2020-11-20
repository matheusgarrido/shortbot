async function helpCommand(event){
    const messageToSend = "Guia de ajuda";
    event.channel.send(messageToSend);
}

export default helpCommand;