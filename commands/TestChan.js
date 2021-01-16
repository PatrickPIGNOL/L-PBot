const Command = require("../Command.js");
class Ping extends Command {
    constructor() 
    {
        super
        (
            "testchan",
            [],
            ["ADMINISTRATOR"],
            0,
            0,
            0,
            0,
            "testchan",
            "Commande pour tester le type du chan.",
            true,
            0
        );
    }
    async mExecute(pDiscordBot, message, args) 
    {
        super
        .mExecute(pDiscordBot, message, args)
        .then(() => 
        {
            const test = message.channel.type
            message.reply(test);
            message.delete();
        })
        .catch(e => 
        {
            console.error(e);
            message.reply(e);
            message.delete();
            return;
        });
    }
}

module.exports = new Ping();