const OnEvent = require("../OnEvent.js");
class OnResume extends OnEvent 
{
  constructor() 
  {
    super("resume");
  }

  async mExecute(pDiscordBot, ...args) 
  {
    const replayed = args[0];
    await this.mOnResume(pDiscordBot, replayed);
  }

  async mOnResume(pDiscordBot, replayed) 
  {
    console.log(`whenever a WebSocket resumes, ${replayed} replays`);
  }
} 

module.exports = new OnResume();