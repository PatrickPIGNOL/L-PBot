const Discord = require('discord.js'); //Ce que le bot à besoin /
const ytdl = require('ytdl-core');
const fs = require('fs');
const config = require('./config.json');
const PollEmbed = require('discord.js-poll-embed');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

const LPBot = new Discord.Client(); //Que votre Bot est un nouvel utilisateur

const commandHelp = new Discord.MessageEmbed()
    .setColor('#00FF00')
    .setTitle('**L&PBot** command panel')
    .setURL('')
    .setAuthor('L&PBot', 'https://cdn.discordapp.com/avatars/695087546774061098/ffa4f7a78064cf9047c709e48357e495.webp', 'https://discord.gg/wVXbnUD')
    .setDescription('Robot à tout faire...')
    .setThumbnail('https://cdn.discordapp.com/avatars/695087546774061098/ffa4f7a78064cf9047c709e48357e495.webp')
    .addFields(
        {name: '**ping**', value: 'Répond : "pong".', inline: false},
    //    {name: '**test**', value: '``test``', inline: true},
        {name: '**help**', value: 'Retourne la liste des commandes disponibles.', inline: false},
        {name: '**De futures commandes sont à venir**', value: 'Actuellement en création\nde nouvelles commandes utiles', inline: false},//info sur des prochaines commandes
    )
    .setImage('')
    .setTimestamp()
    .setFooter('');

LPBot.login(config.token);

LPBot.clearImmediate();
LPBot.removeAllListeners();

// ready
/* Emitted when the client becomes ready to start working.    */
LPBot.on('ready', () =>  
{
    LPBot.user.setStatus ("online");
    LPBot.user.setActivity("écrire son code source...", {type: 1 });
    console.log (`- ${LPBot.user.tag} - Je suis en ligne monsieur !`);

    console.log(`${LPBot.guilds.cache.first().members.cache.size} users, in ${LPBot.guilds.cache.first().channels.cache.size} channels of ${LPBot.guilds.cache.size} guilds.`); 
    
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) 
    {
        sql.prepare("CREATE TABLE scores (guild TEXT, user TEXT, points INTEGER, level INTEGER, PRIMARY KEY (guild, user));").run();        
    }
    LPBot.getScore = sql.prepare("SELECT * FROM scores WHERE guild = ? AND user = ? ORDER BY points ASC");
    LPBot.setScore = sql.prepare("INSERT OR REPLACE INTO scores (guild , user, points, level) VALUES (@guild, @user, @points, @level);");
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = persist");
    
});

LPBot.on("message", async message => 
{
    //console.log(`message is created -> ${message}`);
    console.log("Nouveau message <" + message + "> de @" + message.author.tag + "(" + message.author.id + ") dans #" + message.channel.name + " : \"" + message.content + "\";\n");
    
    /*
    if(message.author === message.guild.owner.user && message.content === "")
    {
        console.log("delete unuseful message");
        message.delete();
    }
    */

    if(message.author.bot)
    {
        console.log("message is a bot message. Returning.");
        return;
    }

    const vArgs = message.content.slice().split(/ +/);
    vArgs.forEach(vArg => 
    {
        
        if(vArg.toLowerCase().startsWith("merci") || vArg.toLowerCase().startsWith("remerci") || vArg.toLowerCase().startsWith("remercie") || vArg.toLowerCase() === "thanks" || vArg.toLowerCase() === "thank" || vArg.toLowerCase() === "thank's"|| vArg.toLowerCase() === "thx")
        {
            message.mentions.members.forEach(vMember => 
            {
                const vUser = vMember.user;
                console.log(`utilisateur @${vUser.tag} (${vUser.id}) détecté.`);
                if(!vUser.bot)
                {
                    if(message.author !== vUser)
                    {
                        var vScore;
                        if(message.guild)
                        {
                            vScore = LPBot.getScore.get(message.guild.name, vUser.tag);                            
                            if(!vScore)
                            {
                                vScore = { guild: message.guild.name, user: vUser.tag, points: 0, level:0};
                            }
                            vScore.points++;
                            console.log(vScore);
                            var vMessage = `${message.author} a donné à ${vUser} +1 point de Reconnaissance soit un total de ${vScore.points}.\n`;
                            const vLevel = Math.floor(Math.sqrt(vScore.points));
                            if(vScore.level < vLevel)
                            {
                                vScore.level = vLevel;
                                vMessage += `${vUser} est passé au niveau supérieur soit le niveau ${vScore.level}.\n:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
                            }
                            console.log(vScore);
                            message.channel.send(vMessage);
                            LPBot.setScore.run(vScore);
                        }
                    }
                }
            });
        }
    });

    if(!message.content.startsWith(config.prefix))
    {
        console.log("message is not a command. Returning.");
        return;
    }
/*
    try
    {
*/
    if(message.content.startsWith(config.prefix + "points"))
    {
        var vEmbed = new Discord.MessageEmbed();
            
        //message.reply(vEmbed)
        message.delete();
    }
    if(message.content.startsWith(config.prefix + "give"))
    {
        if(message.author !== message.guild.owner.user)
        {
            message.reply("Vous n'avez pas le droit d'utiliser la commande \"-give\"");
            message.delete();
            return;
        }
        const vArgs = message.content.slice().split(/ +/);
        if(isNaN(vArgs[1]))
        {
            message.reply("Vous devez donner un nombre de points valide.");
            message.delete();
            return;
        }
        const vPoints = parseInt(vArgs[1]);

        message.mentions.members.forEach(vMember => 
        {
            vUser = vMember.user;
            vScore = LPBot.getScore.get(message.guild.name, vUser.tag);
            if(!vScore)
            {
                vScore = { guild: message.guild.name, user: vUser.tag, points: 0, level:1};
            }
            vScore.points += vPoints;
            var vMessage = `${message.author} a donné à ${vMember} ${vPoints} point de Reconnaissance soit un total de ${vScore.points}.\n`;
            const vLevel = Math.floor(Math.sqrt(vScore.points));
            if(vScore.level != vLevel)
            {
                vMessage += `${vUser} est passé au niveau ${vLevel}.:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
            }
            vScore.level = vLevel;
            LPBot.setScore.run(vScore);
            message.channel.send(vMessage);
        });
        message.delete();
    }
    else
    if(message.content.startsWith(config.prefix + "top")) 
    {
        if(message.author !== message.guild.owner.user)
        {
            message.reply("Vous n'avez pas la permission d'utiliser la commande top.");
            message.delete();
            return;
        }
        console.log("entering top");
        const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC, user ASC LIMIT 20;").all(message.guild.name);
        console.log("top10 fetched");
        const embed = new Discord.MessageEmbed()
            .setTitle("Leaderboard")
            .setAuthor(LPBot.user.username, LPBot.user.avatarURL)
            .setDescription("Notre top 20 des points de reconnaissances")
            .setColor(0x00AE86);
        console.log("message embed created");
        var vRank = 1;
        top10.forEach(vData =>
        {
            const vUserTag = vData.user;
            console.log(vUserTag);
            console.log(vData);
            console.log("Rank #" + vRank);
            const vMember = message.guild.members.cache.find(vSearchMember => 
                vSearchMember.user.tag == vUserTag
            );            
            const vUser = vMember.user;
            console.log(vRank + ":" + vUser.tag + ":" + vUser.id);
            if(vUser.tag == vUserTag)
            {
                console.log("user " + vUser.tag + " fetched");
                embed.addField
                (
                    `${vRank} - ${vData.points} points (lvl. ${vData.level})`,
                    `${vUser}`
                );
                //embed.setImage(vUser.displayAvatarURL());
                console.log("Field added !");
                vRank++;
            }                
        });
        console.log("loop Finished !");
        message.channel.send(embed);
        message.delete();            
    }          
    else if(message.content.startsWith(config.prefix + 'deletelast'))
    {
        if(message.author !== message.guild.owner.user)
        {
            message.reply("Vous n'avez pas la permission d'executer cette commande");
            message.delete();
            return;
        }
        const vArgs = message.content.slice(config.prefix.length).split(/ +/);
        console.log("number : " + vArgs[1]);
        if(!vArgs[1] || isNaN(vArgs[1]))
        {
            message.reply("Vous devez spécifier un nobmre valide");
            message.delete();
            return;
        }
        const vMax = vArgs[1];
        const vChannel = message.channel;
        await message.delete();
        const vList = vChannel.messages.fetch({limit: vMax}).then(vMessages =>
        {
            vMessages.forEach((vMessage, vIndex) =>
            {
                console.log("deleting message # " + vIndex + " : " + vMessage.content)
                vMessage.delete();
            });
        });
        vChannel.send(vMax + " messages ont été supprimés.");
    }
    else if(message.content.startsWith(config.prefix + 'bienvenue'))
    {
        if(!message.author !== message.guild.owner)
        {
            message.reply("Vous n'avez pas la permission d'executer cette commande");
            message.delete();
            return;
        }
        if(!message.mentions.members.first())
        {
            message.reply("Vous devez citer au moins une personne");
            message.delete();
            return;
        }

        const member = message.mentions.members.forEach(member => 
        {
            // Send the message to a designated channel on a server:
            const channel = message.guild.channels.cache.find(ch => ch.name === 'accueil-et-départs');
            const reglement = message.guild.channels.cache.find(ch => ch.name === 'règlement');
            const roles = message.guild.channels.cache.find(ch => ch.name === 'rôles');
            const blabla = message.guild.channels.cache.find(ch => ch.name === 'bla-bla-bla');
            const faq = message.guild.channels.cache.find(ch => ch.name === 'faq');
            // Do nothing if the channel wasn't found on this server
            if (!channel) return;
            if (!reglement) return;
            if (!roles) return;
            if (!blabla) return;
            if (!faq) return;
            // Send the message, mentioning the member    
            //message.guild.owner.send(`Nouvel arrivant sur le serveur : ${member}.`)
            channel.send(`Bienvenu à toi, ${member}.\nValide le règlement dans ${reglement} svp.\nPuis attribue toi des rôles dans ${roles}.\nEnfin dis "Bonjour" dans ${blabla}.\nSi tu ne sais pas où aller, la ${faq} te guidera.`);                
        });
        
        message.delete();
    }
    else if (message.content.startsWith(config.prefix + 'ping')) 
    {
        message.reply('pong');
        message.delete();
    }
    else if (message.content.startsWith(config.prefix + 'showavatar')) 
    {
        message.reply(message.author.displayAvatarURL());
        message.delete();
    }
    else if (message.content.startsWith(config.prefix + 'showbot')) 
    {
        message.reply(LPBot.user.displayAvatarURL());
        message.delete();
    }
    else if ( message.content.startsWith(config.prefix + "poll")) 
    {            
        const args = message.content.slice(config.prefix.length).split(/"+/);
        var vIndexPoll = 0;
        var vPollArgs = new Array();
        var vPollTitle = "";
        for(var vIndex = 0; vIndex < args.length ; vIndex++)
        {
            if
            (
                args[vIndex].trim() === ""
                ||
                args[vIndex].trim() === "poll")
            {
            }
            else                     
            {
                if(vPollTitle === "")
                {
                    vPollTitle = args[vIndex];
                }
                else
                {
                    vPollArgs.push(args[vIndex]);
                }                    
            }                
        }            
        
        for(var vIndex = 0; vIndex < vPollArgs.length; vIndex++)
        {
            console.log(vIndex + "=>" + vPollArgs[vIndex]);
        }
        
        try
        {
            PollEmbed(message, vPollTitle, vPollArgs, 0);
        }
        catch(error)
        {
            console.log(error.message);
        }
    }
    else if ( message.content.startsWith(config.prefix + "help")) 
    {
        message.author.send(commandHelp);
        message.delete();
    }
    else if(message.content.startsWith(config.prefix + "fruits"))
    {
        message.react('🍎')
            .then(() => message.react('🍊'))
            .then(() => message.react('🍇'))
            .catch(() => console.error('One of the emojis failed to react.'));
    }
    else
    {
        message.delete();
    }
    /*
    }
    catch (error) 
    {
        console.error(error.message)
    }
    */
});


// guildMemberUpdate
/* Emitted whenever a guild member changes - i.e. new role, removed role, nickname.
PARAMETER    TYPE               DESCRIPTION
oldMember    GuildMember        The member before the update
newMember    GuildMember        The member after the update    */
LPBot.on("guildMemberUpdate", function(oldMember, newMember)
{
    var vGuild = LPBot.guilds.cache.find(vGuild => vGuild.name === "Logique & Programmation");
    var vSystem = vGuild.channels.cache.find(vChannel => vChannel.name === "système");
    if(oldMember && newMember)
    {
        console.log(`a guild member changes from ${oldMember.tag} to ${newMember.tag} - i.e. new role, removed role, nickname.`);
        console.log(`old nickname : ${oldMember.user.nickname}; new nickname : ${newMember.user.nickname}`);
        console.log(`old tag : ${oldMember.user.tag}; new tag : ${newMember.user.tag}`);
        
        console.log(`old roles :\n`);        
        for(var vIndex = 0; vIndex < oldMember.roles.size; vIndex++)
        {
            console.log(`${oldMember.user.roles[vIndex].tag}\n`);
        }

        console.log(`new roles :\n`);
        for(var vIndex = 0; vIndex < newMember.roles.size; vIndex++)
        {
            console.log(`${newMember.roles[vIndex].tag}\n`);
        }
    }
    else if(oldMember)
    {
        console.log(`a guild member changes from ${oldMember.tag} - i.e. new role, removed role, nickname.`);
        console.log(`old nickname : ${oldMember.nickname}`);
        console.log(`old tag : ${oldMember.tag}`);
        console.log(`old roles :\n`);
        for(var vIndex = 0; vIndex < oldMember.roles.size; vIndex++)
        {
            console.log(`${oldMember.roles[vIndex].tag}\n`);
        }
        console.log(`new roles :\n`);
        for(var vIndex = 0; vIndex < newMember.roles.size; vIndex++)
        {
            console.log(`${newMember.roles[vIndex].tag}\n`);
        }
    }
    else if(newMember)
    {
        var vMessage = `a guild member changes to ${newMember.tag} - i.e. new role, removed role, nickname.\n`;
        vMessage += `new nickname : ${newMember.nickname}\n`;
        vMessage += `new tag : ${newMember.tag}\n`;
        vMessage += `new roles :\n`;
        for(var vIndex = 0; vIndex < newMember.roles.size; vIndex++)
        {            
            vMessage +=`${newMember.roles[vIndex].tag}\n`;
        }
        vSystem.send(vMessage);
    }
    else
    {
        vSystem.send(`a guild member changes - i.e. new role, removed role, nickname.`);
        console.log(`a guild member changes - i.e. new role, removed role, nickname.`);
    }
});


// guildMemberAdd
/* Emitted whenever a user joins a guild.
PARAMETER     TYPE               DESCRIPTION
member        GuildMember        The member that has joined a guild    */
LPBot.on("guildMemberAdd", function(member)
{
    console.log(`a user joins a guild: ${member.tag}`);
    try
    {
        const guild = member.guild;
        // Send the message to a designated channel on a server:
        const channel = guild.channels.cache.find(ch => ch.name === 'accueil-et-départs');
        const reglement = guild.channels.cache.find(ch => ch.name === 'règlement');
        const roles = guild.channels.cache.find(ch => ch.name === 'rôles');
        const blabla = guild.channels.cache.find(ch => ch.name === 'bla-bla-bla');
        const faq = guild.channels.cache.find(ch => ch.name === 'faq');
        // Do nothing if the channel wasn't found on this server
        if (!channel) return;
        if (!reglement) return;
        if (!roles) return;
        if (!blabla) return;
        if (!faq) return;
        // Send the message, mentioning the member    
        guild.owner.send(`Nouvel arrivant sur le serveur : ${member}.`);
        channel.send(`Bienvenu à toi, ${member}.\nValide le règlement dans ${reglement} svp.\nPuis attribue toi des rôles dans ${roles}.\nEnfin dis "Bonjour" dans ${blabla}.\nSi tu ne sais pas où aller, la ${faq} te guidera.`);
    }
    catch (error) 
    {
        console.log (error.message)
    }
});

// guildMemberRemove
/* Emitted whenever a member leaves a guild, or is kicked.
PARAMETER     TYPE               DESCRIPTION
member        GuildMember        The member that has left/been kicked from the guild    */
LPBot.on("guildMemberRemove", function(member)
{
    console.log(`a member leaves a guild, or is kicked: ${member.tag}`);
    try
    {
        const guild = member.guild;
        const channel = guild.channels.cache.find(ch => ch.name === 'accueil-et-départs');
        guild.owner.send(`${member} est parti du serveur.`)
        if (!channel) return;
        channel.send(`Bon vent à toi, ${member}.`);
    }
    catch (error) 
    {
        console.log (error.message)
    }
});


// channelCreate
/* Emitted whenever a channel is created.
PARAMETER    TYPE        DESCRIPTION
channel      Channel     The channel that was created    */
LPBot.on("channelCreate", function(channel){
    console.log(`channelCreate: ${channel}`);
});
// channelDelete
/* Emitted whenever a channel is deleted.
PARAMETER   TYPE      DESCRIPTION
channel     Channel   The channel that was deleted    */
LPBot.on("channelDelete", function(channel){
    console.log(`channelDelete: ${channel}`);
});
// channelPinsUpdate
/* Emitted whenever the pins of a channel are updated. Due to the nature of the WebSocket event, not much information can be provided easily here - you need to manually check the pins yourself.
PARAMETER    TYPE         DESCRIPTION
channel      Channel      The channel that the pins update occurred in
time         Date         The time of the pins update    */
LPBot.on("channelPinsUpdate", function(channel, time){
    console.log(`channelPinsUpdate: ${channel}:${time}`);
});
// channelUpdate
/* Emitted whenever a channel is updated - e.g. name change, topic change.
PARAMETER        TYPE        DESCRIPTION
oldChannel       Channel     The channel before the update
newChannel       Channel     The channel after the update    */
LPBot.on("channelUpdate", function(oldChannel, newChannel)
{
    console.log(`channelUpdate -> a channel is updated - e.g. name change, topic change`);
});
// clientUserGuildSettingsUpdate
/* Emitted whenever the client user's settings update.
PARAMETER                  TYPE                       DESCRIPTION
clientUserGuildSettings    ClientUserGuildSettings    The new client user guild settings    */
LPBot.on("clientUserGuildSettingsUpdate", function(clientUserGuildSettings){
    console.log(`clientUserGuildSettingsUpdate -> client user's settings update`);
});

// clientUserSettingsUpdate
/* Emitted when the client user's settings update.
PARAMETER             TYPE                  DESCRIPTION
clientUserSettings    ClientUserSettings    The new client user settings    */
LPBot.on("clientUserSettingsUpdate", function(clientUserSettings){
    console.log(`clientUserSettingsUpdate -> client user's settings update`);
});

// debug
/* Emitted for general debugging information.
PARAMETER    TYPE         DESCRIPTION
info         string       The debug information    */
LPBot.on("debug", function(info)
{
    //console.log(`debug -> ${info}`);
});

// disconnect
/* Emitted when the client's WebSocket disconnects and will no longer attempt to reconnect.
PARAMETER    TYPE              DESCRIPTION
Event        CloseEvent        The WebSocket close event    */
LPBot.on("disconnect", function(event){
    console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
});

// emojiCreate
/* Emitted whenever a custom emoji is created in a guild.
PARAMETER    TYPE          DESCRIPTION
emoji        Emoji         The emoji that was created    */
LPBot.on("emojiCreate", function(emoji)
{
    console.log(`a custom emoji is created in a guild`);
});

// emojiDelete
/* Emitted whenever a custom guild emoji is deleted.
PARAMETER    TYPE         DESCRIPTION
emoji        Emoji        The emoji that was deleted    */
LPBot.on("emojiDelete", function(emoji){
    console.log(`a custom guild emoji is deleted`);
});

// emojiUpdate
/* Emitted whenever a custom guild emoji is updated.
PARAMETER    TYPE       DESCRIPTION
oldEmoji     Emoji      The old emoji
newEmoji     Emoji      The new emoji    */
LPBot.on("emojiUpdate", function(oldEmoji, newEmoji){
    console.log(`a custom guild emoji is updated`);
});

// emojiDelete
/* Emitted whenever a custom guild emoji is deleted.
PARAMETER    TYPE         DESCRIPTION
emoji        Emoji        The emoji that was deleted    */
LPBot.on("emojiDelete", function(emoji){
    console.log(`a custom guild emoji is deleted`);
});

// emojiUpdate
/* Emitted whenever a custom guild emoji is updated.
PARAMETER    TYPE       DESCRIPTION
oldEmoji     Emoji      The old emoji
newEmoji     Emoji      The new emoji    */
LPBot.on("emojiUpdate", function(oldEmoji, newEmoji){
    console.log(`a custom guild emoji is updated`);
});

// error
/* Emitted whenever the client's WebSocket encounters a connection error.
PARAMETER    TYPE     DESCRIPTION
error        Error    The encountered error    */
LPBot.on("error", function(error){
    console.error(`client's WebSocket encountered a connection error: ${error}`);
});

// guildCreate
/* Emitted whenever the client joins a guild.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The created guild    */
LPBot.on("guildCreate", function(guild){
    console.log(`the client joins a guild`);
});

// guildDelete
/* Emitted whenever a guild is deleted/left.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The guild that was deleted    */
LPBot.on("guildDelete", function(guild){
    console.log(`the client deleted/left a guild`);
});

// guildMemberAvailable
/* Emitted whenever a member becomes available in a large guild.
PARAMETER     TYPE               DESCRIPTION
member        GuildMember        The member that became available    */
LPBot.on("guildMemberAvailable", function(member){
    console.log(`member becomes available in a large guild: ${member.tag}`);
});

// guildMembersChunk
/* Emitted whenever a chunk of guild members is received (all members come from the same guild).
PARAMETER      TYPE                      DESCRIPTION
members        Array<GuildMember>        The members in the chunk
guild          Guild                     The guild related to the member chunk    */
LPBot.on("guildMembersChunk", function(members, guild){
    console.error(`a chunk of guild members is received`);
});

// guildMemberSpeaking
/* Emitted once a guild member starts/stops speaking.
PARAMETER     TYPE                DESCRIPTION
member        GuildMember         The member that started/stopped speaking
speaking      boolean             Whether or not the member is speaking    */
LPBot.on("guildMemberSpeaking", function(member, speaking){
    console.log(`a guild member starts/stops speaking: ${member.tag}`);
});
// guildUnavailable
/* Emitted whenever a guild becomes unavailable, likely due to a server outage.
PARAMETER    TYPE          DESCRIPTION
guild        Guild         The guild that has become unavailable    */
LPBot.on("guildUnavailable", function(guild){
    console.error(`a guild becomes unavailable, likely due to a server outage: ${guild}`);
});

// guildUpdate
/* Emitted whenever a guild is updated - e.g. name change.
PARAMETER     TYPE      DESCRIPTION
oldGuild      Guild     The guild before the update
newGuild      Guild     The guild after the update    */
LPBot.on("guildUpdate", function(oldGuild, newGuild){
    console.error(`a guild is updated`);
});
// messageDelete
/* Emitted whenever a message is deleted.
PARAMETER      TYPE           DESCRIPTION
message        Message        The deleted message    */
LPBot.on("messageDelete", function(message)
{
/*
    message.guild.channels.cache.find(ch => 
    {
        ch.name === "système"
    }).send(`message <${message.id}> is deleted -> ${message.content}`);
*/
    console.error(`message <${message.id}> is deleted -> ${message.content}`);
});

// messageDeleteBulk
/* Emitted whenever messages are deleted in bulk.
PARAMETER    TYPE                              DESCRIPTION
messages     Collection<Snowflake, Message>    The deleted messages, mapped by their ID    */
LPBot.on("messageDeleteBulk", function(messages){
    console.error(`messages are deleted -> ${messages}`);
});

// messageReactionAdd
/* Emitted whenever a reaction is added to a message.
PARAMETER              TYPE                   DESCRIPTION
messageReaction        MessageReaction        The reaction object
user                   User                   The user that applied the emoji or reaction emoji     */
LPBot.on("messageReactionAdd", function(messageReaction, user){
    console.log(`a reaction is added to a message`);
});

// messageReactionRemove
/* Emitted whenever a reaction is removed from a message.
PARAMETER              TYPE                   DESCRIPTION
messageReaction        MessageReaction        The reaction object
user                   User                   The user that removed the emoji or reaction emoji     */
LPBot.on("messageReactionRemove", function(messageReaction, user){
    console.log(`a reaction is removed from a message`);
});

// messageReactionRemoveAll
/* Emitted whenever all reactions are removed from a message.
PARAMETER          TYPE           DESCRIPTION
message            Message        The message the reactions were removed from    */
LPBot.on("messageReactionRemoveAll", function(message){
    console.error(`all reactions are removed from a message`);
});

// messageUpdate
/* Emitted whenever a message is updated - e.g. embed or content change.
PARAMETER     TYPE           DESCRIPTION
oldMessage    Message        The message before the update
newMessage    Message        The message after the update    */
LPBot.on("messageUpdate", function(oldMessage, newMessage){
    console.log(`a message is updated`);
});

// presenceUpdate
/* Emitted whenever a guild member's presence changes, or they change one of their details.
PARAMETER    TYPE               DESCRIPTION
oldMember    GuildMember        The member before the presence update
newMember    GuildMember        The member after the presence update    */
LPBot.on("presenceUpdate", function(oldMember, newMember)
{
    var vMessage = "";
    var vLog = "";
    if(oldMember && newMember)
    {
        vMessage    += `a guild member's presence changes from ${oldMember.user}:${oldMember.status} to ${newMember.user}:${newMember.status}`;
        vLog        += `a guild member's presence changes from @${oldMember.user.tag}(${oldMember.user.id}):${oldMember.status} to @${newMember.user.tag}(${newMember.user.id}):${newMember.status}`;
    }
    else if(oldMember)
    {
        vMessage    += `a guild member's presence changes from ${oldMember.user}:${oldMember.status}`;
        vLog        += `a guild member's presence changes from @${oldMember.user.tag}(${oldMember.user.id}):${oldMember.status}`;
    }
    else if(newMember)
    {
        vMessage    += `a guild member's presence changes to ${newMember.user}:${newMember.status}`;
        vLog        += `a guild member's presence changes to @${newMember.user.tag}(${newMember.user.id}):${newMember.status}`;
    }
    else
    {
        vMessage    += `a guild member's presence changes`;
        vLog        += `a guild member's presence changes`;
    }
    var vSystem = LPBot.guilds.cache.first().channels.cache.find(vChannel => vChannel.name === "système");
    //vSystem.send(vMessage);
    console.log(vLog);
});
// reconnecting
/* Emitted whenever the client tries to reconnect to the WebSocket.    */
LPBot.on("reconnecting", function(){
    console.log(`client tries to reconnect to the WebSocket`);
});

// resume
/* Emitted whenever a WebSocket resumes.
PARAMETER    TYPE          DESCRIPTION
replayed     number        The number of events that were replayed    */
LPBot.on("resume", function(replayed)
{
    console.log(`whenever a WebSocket resumes, ${replayed} replays`);
});

// roleCreate
/* Emitted whenever a role is created.
PARAMETER    TYPE        DESCRIPTION
role         Role        The role that was created    */
LPBot.on("roleCreate", function(role)
{
    console.error(`a guild role ${role}`);
});

// roleDelete
/* Emitted whenever a guild role is deleted.
PARAMETER    TYPE        DESCRIPTION
role         Role        The role that was deleted    */
LPBot.on("roleDelete", function(role){
    console.error(`a guild role ${role} is deleted`);
});

// roleUpdate
/* Emitted whenever a guild role is updated.
PARAMETER      TYPE        DESCRIPTION
oldRole        Role        The role before the update
newRole        Role        The role after the update    */
LPBot.on("roleUpdate", function(oldRole, newRole){
    console.error(`a guild role ${oldRole}, ${newRole} is updated`);
});

// typingStart
/* Emitted whenever a user starts typing in a channel.
PARAMETER      TYPE            DESCRIPTION
channel        Channel         The channel the user started typing in
user           User            The user that started typing    */
LPBot.on("typingStart", function(channel, user){
    console.log(`<${user.tag}> has started typing in channel ${channel.name}`);
});

// typingStop
/* Emitted whenever a user stops typing in a channel.
PARAMETER       TYPE           DESCRIPTION
channel         Channel        The channel the user stopped typing in
user            User           The user that stopped typing    */
LPBot.on("typingStop", function(channel, user){
    console.log(`<${user.tag}> has stopped typing`);
});

// userNoteUpdate
/* Emitted whenever a note is updated.
PARAMETER      TYPE          DESCRIPTION
user           User          The user the note belongs to
oldNote        String        The note content before the update
newNote        String        The note content after the update    */
LPBot.on("userNoteUpdate", function(user, oldNote, newNote){
    console.log(`a member's note is updated`);
});

// userUpdate
/* Emitted whenever a user's details (e.g. username) are changed.
PARAMETER      TYPE        DESCRIPTION
oldUser        User        The user before the update
newUser        User        The user after the update    */
LPBot.on("userUpdate", function(oldUser, newUser){
    console.log(`user's details (e.g. username) are changed`);
});

// voiceStateUpdate
/* Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
PARAMETER    TYPE             DESCRIPTION
oldMember    GuildMember      The member before the voice state update
newMember    GuildMember      The member after the voice state update    */
LPBot.on("voiceStateUpdate", function(oldMember, newMember){
    console.log(`a user changes voice state`);
});

// warn
/* Emitted for general warnings. 
PARAMETER    TYPE       DESCRIPTION
info         string     The warning   */
LPBot.on("warn", function(info){
    console.log(`warn: ${info}`);
});
