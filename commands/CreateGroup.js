const Command = require("../Command.js");
class CreateGroup extends Command {
  constructor() {
    super(
      "creategroup",
      [],
      ["ADMINISTRATOR"],
      0,
      0,
      0,
      0,
      "creategroup",
      "Crée un groupe de commandes pour gérer les rôles autoassignables.",
      true,
      0
    );
  }
  
  async mExecute(pDiscordBot, message, args) {
    super
      .mExecute(pDiscordBot, message, args)
      .then(() => {
        this.mStep1(pDiscordBot, message, args);        
      })
      .catch(e => {
        console.error("error : " + e);
        message.reply(e);
        message.delete();
        return;
      });
  }
  
  async mStep1(pDiscordBot, message, args)
  {
    const vStep1 = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setColor(pDiscordBot.aConfig.Good)
      .setTitle("Assitant de création de groupe\nEtape 1 : Nom du Groupe")
      .setDescription("Quel nom souhaitez vous donner au groupe ?")
      .setThumbnail(message.author.displayAvatarURL());

    const vFilter = m => m.author.id === message.author.id;
    message.reply(vStep1).then(vStep1 => 
    {
      message.channel
        .awaitMessages(vFilter, {
          time: 300000,
          max: 1
        })
        .then(collected => 
        {
          const vGroupName = collected.first().content;
          collected.forEach(m => {
            m.delete();
          });
          vStep1.delete();
          this.mStep2(pDiscordBot, message, args, vFilter, vGroupName);
        })
        .catch(() => {
          const vError = new pDiscordBot.aDiscord.MessageEmbed()
            .setAuthor(
              pDiscordBot.aClient.user.username,
              pDiscordBot.aClient.user.displayAvatarURL(),
              pDiscordBot.aConfig.URL
            )
            .setColor(pDiscordBot.aConfig.Good)
            .setTitle("Erreur ...")
            .setDescription("Timeout, Opération annulée.")
            .setThumbnail(message.author.displayAvatarURL());
          message.reply(vError);
          message.delete();
        });
    });
  }
  
  async mStep2(pDiscordBot, message, args, pFilter, pGroupName)
  {
    const vStep2 = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setColor(pDiscordBot.aConfig.Good)
      .setTitle("Assitant de création de groupe\nEtape 2 : Mode")
      .setDescription(
        "Quel mode souhaitez vous donner au groupe ?\n0️⃣ Standard\n1️⃣ Unique\n2️⃣ Multiple"
      )
      .setThumbnail(message.author.displayAvatarURL());
    message.reply(vStep2).then(vStep2 => 
    {
      message.channel
        .awaitMessages(pFilter, {
          time: 3000000,
          max: 1
        })
        .then(collected => {
          const vAnswerMode = collected.first().content;
          console.log(vAnswerMode);
          if(isNaN(vAnswerMode) || parseInt(vAnswerMode)<0 || parseInt(vAnswerMode)>3)
          {
            const vError = new pDiscordBot.aDiscord
              .MessageEmbed()
              .setAuthor(
                pDiscordBot.aClient.user.username,
                pDiscordBot.aClient.user.displayAvatarURL(),
                pDiscordBot.aConfig.URL
              )
              .setColor(pDiscordBot.aConfig.Good)
              .setTitle("Erreur ...")
              .setDescription("La valeur entrée n'est pas valide, Opération annulée.")
              .setThumbnail(message.author.displayAvatarURL());
            message.reply(vError);
            return; 
          }
          const vMode = parseInt(vAnswerMode);
          collected.forEach(m => {
            m.delete();
          });
          vStep2.delete();
          
          this.mStep3(pDiscordBot, message, args, pFilter, pGroupName, vMode);
          
        })
        .catch(() => {
          const vError = new pDiscordBot.aDiscord
            .MessageEmbed()
            .setAuthor(
              pDiscordBot.aClient.user.username,
              pDiscordBot.aClient.user.displayAvatarURL(),
              pDiscordBot.aConfig.URL
            )
            .setColor(pDiscordBot.aConfig.Good)
            .setTitle("Erreur ...")
            .setDescription("Timeout, Opération annulée.")
            .setThumbnail(message.author.displayAvatarURL());
          message.reply(vError);
        });
      message.delete();
    });
  }
  
  async mStep3(pDiscordBot, message, args, pFilter, pGroupName, pMode)
  {    
    let vTitle = "Assitant de création de groupe\nEtape 3 : ";
    let vMessage = "";
    switch(pMode)
    {
      case 0:
      {
        this.mStep4(pDiscordBot, message, args, pFilter, pGroupName, pMode);
      }break;
      case 1:
      {
        vTitle += "Unique";
        vMessage += "";
      }break;
      case 2:
      {
        vTitle += "Multiple";
        vMessage += "";
      }break;
      default:
      {
        
      }break;
    }
    const vStep3 = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setColor(pDiscordBot.aConfig.Good)
      .setTitle(vTitle)
      .setDescription(
        vMessage
      )
      .setThumbnail(message.author.displayAvatarURL());
    message.reply(vStep3).then(vStep3 => 
    {
      message.channel
        .awaitMessages(pFilter, {
          time: 3000000,
          max: 1
        })
        .then(collected => {
          switch(pMode)
          {
            case 1:
            {
              vTitle += "Unique";
            }break;
            case 2:
            {
              vTitle += "Multiple";
              vMessage += "";
            }break;
            default:
            {

            }break;
          }        
          vStep3.delete();
          this.mStep4(pDiscordBot, message, args, pFilter, pGroupName, pMode);
        })
        .catch(() => {
          const vError = new pDiscordBot.aDiscord
            .MessageEmbed()
            .setAuthor(
              pDiscordBot.aClient.user.username,
              pDiscordBot.aClient.user.displayAvatarURL(),
              pDiscordBot.aConfig.URL
            )
            .setColor(pDiscordBot.aConfig.Good)
            .setTitle("Erreur ...")
            .setDescription("Timeout, Opération annulée.")
            .setThumbnail(message.author.displayAvatarURL());
          message.reply(vError);
        });
      
    });
  }
  async mStep4(pDiscordBot, message, args, pFilter, pGroupName, pMode)
  {   
    
    message.delete();
    message.reply(pGroupName + "\n" + pMode);   
  }
}

module.exports = new CreateGroup();
