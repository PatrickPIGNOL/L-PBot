class OnUserNoteUpdate {
  constructor() {
    this.aEventName = "userNoteUpdate";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const user = args[0];
    const oldNote = args[1];
    const newNote = args[2];
    await this.mOnUserNoteUpdate(pDiscordBot, user, oldNote, newNote);
  }

  async mOnUserNoteUpdate(pDiscordBot, user, oldNote, newNote) {
    console.log(`a member's note is updated`);
  }
}

module.exports = new OnUserNoteUpdate();