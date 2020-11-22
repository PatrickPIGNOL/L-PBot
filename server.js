const LPBot = require("./discordbot.js");
LPBot.mLogin();

const express = require("express");
const app = express();
app.use(express.static("public"));

const listener = app.listen(process.env.PORT, () => 
{
  console.log("Your app is listening on port " + listener.address().port);
});

function mHTMLHeader() 
{
  var vHTML =
    "<!DOCTYPE html>" +
    "<html lang='fr'>" +
    "<head>" +
    "<meta charset='utf-8'>" +
    "<title>";
  if (LPBot.mClient().user) {
    vHTML += LPBot.mClient().user.username;
  } else {
    vHTML += "LPBot";
  }
  vHTML +=
    " : Logique & Programmation</title>" +
    "<meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
    "<meta name='description' content='A cool thing made with Glitch'>" +
    "<link id='favicon' rel='icon' href='";
  if (LPBot.mClient().user) {
    vHTML += LPBot.mClient().user.displayAvatarURL();
  } else {
    vHTML +=
      "https://cdn.discordapp.com/avatars/699652839361872002/ffa4f7a78064cf9047c709e48357e495.webp";
  }
  vHTML +=
    "' type='image/x-icon'>" +
    "<!-- import the webpage's stylesheet -->" +
    "<link rel='stylesheet' href='style.css'>" +
    "</head>" +
    "<body bgcolor='#303030'>";
  return vHTML;
}

function mHTMLFooter() 
{
  var vHTML = "</table></body></html>";
  return vHTML;
}

function mPointsToLevel(pPoints)
{
    return Math.floor(Math.log2(pPoints) + 1);
}

function mLevelToPoints(pLevel)
{
    return Math.floor(Math.pow(2, pLevel));
}

app.get("/", (request, response) => {
//  while (!LPBot.status === 4) {}
  let vHTML = mHTMLHeader();
  if (LPBot && LPBot.mClient() && LPBot.mClient().user) {
    vHTML += `</H1><img src='${LPBot.mClient().user.displayAvatarURL()}' width='50'>${
      LPBot.mClient().user.username
    } : en ligne ...</H1>`;
  } else {
    vHTML += `</H1><img src='https://cdn.discordapp.com/avatars/699652839361872002/ffa4f7a78064cf9047c709e48357e495.webp' width='50'>L&PBot : Hors service ...</H1>`;
  }
  vHTML += mHTMLFooter();
  response.send(vHTML);
});
/*
app.get("/monitor", async (request, response) => {
  let vRandom = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  let vRandom2 = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  let vHTML = mHTMLHeader();
  //const vCat = await LPBot.mCat();
  vHTML += `${vRandom}<BR/>${vRandom2}`;  
  vHTML += `<script type="text/javascript">`+
    `setTimeout(()=>{`+
    `location = 'https://l-pbot.glitch.me/'`+
    `}, 300000)`+
    `</script>`;
  vHTML += mHTMLFooter();
  response.send(vHTML);
});
*/

app.get("/reconnaissance", (request, response) => {
  while (!LPBot.status === 4) {}
  let vHTML = mHTMLHeader();
  vHTML +=
    "<H1><table width='100%'><tr><td><img src='" +
    LPBot.mClient().user.displayAvatarURL() +
    "' width='80' height='80'></td><td align='left'>" +
    LPBot.mClient().user.username +
    "</td><td width='100%'></td></tr></table></H1>" +
    "<H2>Classement des points de reconnaissances</H2><table width='100%' border='0' cellpadding='0' cellspacing='0'>";
  let vRank = 1;
  let vGuild = LPBot.mClient().guilds.cache.find(
    vGuildFound => vGuildFound.name === "Logique & Programmation"
  );
  const vTop = LPBot.mSQL().Database.Reconnaissances.mAllReconnaissances(vGuild.id);
  vTop.forEach(vData => {
    const vUserID = vData.MemberID;
    const vMember = vGuild.members.cache.find(
      vSearchMember => vSearchMember.user.id == vUserID
    );
    if (vMember) {
      const vUser = vMember.user;
      vHTML +=
        "<tr><td>" +
        vRank +
        "</td><td>&nbsp;</td><td>" +
        "<img valign='middle' src='" +
        vUser.displayAvatarURL() +
        "' width='80' height='80' border='0'>" +
        "</td><td>&nbsp;</td><td width='100%'>" +
        vUser.username +
        " (@" +
        vUser.tag +
        ")" +
        "</BR>" +
        vData.Points +
        " points : Niveau " +
        mPointsToLevel(vData.Points) +
        ". </BR> Prochain niveau (" +
        (mPointsToLevel(vData.Points) + 1) +
        ") : " +
        mLevelToPoints((mPointsToLevel(vData.Points))) +
        " points." +
        "</td></tr><tr><td></td><td></td><td colspan='3'>" +
        "<table width='100%' height='4px' border='0' cellpading='0' cellspacing='0'><tr><td class='barleft' bgcolor='" +
        LPBot.mConfig().Good +
        "' width='" +
        (vData.Points / (mLevelToPoints(mPointsToLevel(vData.Points) + 1))) * 100 +
        "%'></td><td class='barright' bgcolor='#005500'></td></tr></table></td></tr><tr><td colspan='5' height='8px'></td></tr>";
      vRank++;
    }
  });

  vHTML += mHTMLFooter();
  response.send(vHTML);
});

app.get("/participation", (request, response) => {
  while (!LPBot.status === 4) {}
  let vHTML = mHTMLHeader();
  vHTML +=
    "<H1><table width='100%'><tr><td><img src='" +
    LPBot.mClient().user.displayAvatarURL() +
    "' width='80' height='80'></td><td align='left'>" +
    LPBot.mClient().user.username +
    "</td><td width='100%'></td></tr></table></H1>" +
    "<H2>Classement des points de participations</H2><table width='100%' border='0' cellpadding='0' cellspacing='0'>";
  let vRank = 1;
  let vGuild = LPBot.mClient().guilds.cache.find(
    vGuildFound => vGuildFound.name === "Logique & Programmation"
  );
  const vTop = LPBot.mSQL()
    .prepare(
      "SELECT * FROM participations WHERE GuildID = ? ORDER BY Points DESC, MemberTag ASC;"
    )
    .all(vGuild.id);
  vTop.forEach(vData => {
    const vUserID = vData.MemberID;
    const vMember = vGuild.members.cache.find(
      vSearchMember => vSearchMember.user.id == vUserID
    );
    if (vMember) {
      const vUser = vMember.user;
      vHTML +=
        "<tr><td>" +
        vRank +
        "</td><td>&nbsp;</td><td>" +
        "<img valign='middle' src='" +
        vUser.displayAvatarURL() +
        "' width='80' height='80' border='0'>" +
        "</td><td>&nbsp;</td><td width='100%'>" +
        vUser.username +
        " (@" +
        vUser.tag +
        ")" +
        "</BR>" +
        vData.Points +
        " points : Niveau " +
        mPointsToLevel(vData.Points) +
        ". </BR> Prochain niveau (" +
        (mPointsToLevel(vData.Points) + 1) +
        ") : " +
        mLevelToPoints(mPointsToLevel(vData.Points)) +
        " points." +
        "</td></tr><tr><td></td><td></td><td colspan='3'>" +
        "<table width='100%' height='4px' border='0' cellpading='0' cellspacing='0'><tr><td class='barleft' bgcolor='" +
        LPBot.mConfig().Good +
        "' width='" +
        (vData.Points / (mLevelToPoints(mPointsToLevel(vData.Points) + 1))) * 100 +
        "%'></td><td class='barright' bgcolor='#005500'></td></tr></table></td></tr><tr><td colspan='5' height='8px'></td></tr>";
      vRank++;
    }
  });

  vHTML += mHTMLFooter();
  response.send(vHTML);
});
