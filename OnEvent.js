class OnEvent
{
    constructor(pEventName) 
    {
        this.aEventName = pEventName;
    }

    mEventName() 
    {
        return this.aEventName;
    }
}

module.exports = OnEvent;