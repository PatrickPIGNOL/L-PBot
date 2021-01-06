const OnEvent = require("../OnEvent.js");
class OnMessageUpdate extends OnEvent {
    constructor() 
    {
        super("messageUpdate");
    }

    async mExecute(pDiscordBot, ...args) 
    {
        const oldMessage = args[0];
        const newMessage = args[1];
        await this.mOnMessageUpdate(pDiscordBot, oldMessage, newMessage);
    }

    async mOnMessageUpdate(pDiscordBot, oldMessage, newMessage) 
    {
        console.log(`Message updated `);
        if(oldMessage)
        {
            console.log(`From : ${oldMessage.content}`);
            if(oldMessage.embeds.length)
            {
                console.log(`${newMessage.embeds[0].title}`);
                console.log(`${oldMessage.embeds[0].description}`);
            }
        }
        if(newMessage)
        {
            console.log(`To : ${newMessage.content}`);
            if(newMessage.embeds.length)
            {
                console.log(`${newMessage.embeds[0].title}`);
                console.log(`${newMessage.embeds[0].description}`);
            }
        }
    }
}

module.exports = new OnMessageUpdate();