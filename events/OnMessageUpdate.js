class OnMessageUpdate {
  constructor() {
    this.aEventName = "messageUpdate";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const oldMessage = args[0];
    const newMessage = args[1];
    await this.mOnMessageUpdate(pDiscordBot, oldMessage, newMessage);
  }

  async mOnMessageUpdate(pDiscordBot, oldMessage, newMessage) {
    if(oldMessage)
    {
      console.log(`${oldMessage.content}`);
      if(oldMessage.embeds.size)
      {
        console.log(`${oldMessage.embeds[0].description}`);
      }
    }
    if(newMessage)
    {
      console.log(`${newMessage.content} : ${newMessage.embeds[0].description}`);
    }
  }
}

module.exports = new OnMessageUpdate();