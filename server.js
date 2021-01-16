const LPBot = require("./discordbot.js");
const HLJS = require("highlight.js");
LPBot.mLogin();

const express = require("express");
const app = express();
app.use(express.static("public"));

const listener = app.listen(process.env.PORT, () => 
{
  console.log("Your app is listening on port " + listener.address().port);
});

function mHTMLHeader(pTitle) 
{
  var vHTML =
    "<!DOCTYPE html>" +
    "<html lang='fr'>" +
    "<head>" +
    "<meta charset='utf-8'>" +
    "<title>"+ 
        pTitle +
    "</title>" +
    "<meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
    "<link id='favicon' rel='icon' href='";
    if (LPBot.mClient().user) 
    {
        vHTML += LPBot.mClient().user.displayAvatarURL();
    } 
    else 
    {
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

function mHighlight(pLanguage, pCode)
{
    return HLJS.highlight(pLanguage, pCode).value;
}

function mHTMLFooter() 
{
  var vHTML = "</body></html>";
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

app.get
(
    "/", 
    (request, response) => 
    {
        //  while (!LPBot.status === 4) {}

        let vTitle = "";
        if (LPBot.mClient().user) 
        {
            vTitle += LPBot.mClient().user.username;
        } 
        else
        {
            vTitle += "LPBot";
        }
        let vHTML = mHTMLHeader(vTitle);
        if 
        (
            LPBot && LPBot.mClient() && LPBot.mClient().user
        ) 
        {
            vHTML += `</H1><img src='${LPBot.mClient().user.displayAvatarURL()}' width='50'>${LPBot.mClient().user.username} : en ligne ...</H1>`;
        } 
        else
        {
            vHTML += `</H1><img src='https://cdn.discordapp.com/avatars/699652839361872002/ffa4f7a78064cf9047c709e48357e495.webp' width='50'>L&PBot : Hors service ...</H1>`;
        }
        vHTML += mHTMLFooter();
        response.send(vHTML);
    }
);
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

app.get("/reconnaissance", (request, response) => 
{
    while (!LPBot.status === 4) {}
    let vTitle = "";
    if (LPBot.mClient().user) 
    {
        vTitle += LPBot.mClient().user.username;
    } 
    else
    {
        vTitle += "LPBot";
    }
    let vHTML = mHTMLHeader(vTitle);
    vHTML +=
        "<H1>"+
            "<table width='100%'>"+
                "<tr><td><img src='" +
                    LPBot.mClient().user.displayAvatarURL() +
                "' width='80' height='80'></td><td align='left'>" +
                    LPBot.mClient().user.username +
                "</td><td width='100%'></td></tr>"+
            "</table>" +
        "</H1>" +
        "<H2>Classement des points de reconnaissances</H2>";
        
    let vRank = 1;
    let vGuild = LPBot.mClient().guilds.cache.find
    (
        vGuildFound => vGuildFound.name === "Logique & Programmation"
    );
    const vTop = LPBot.mSQL().Database.Reconnaissances.mAllReconnaissances(vGuild.id);
    vTop.forEach
    (
        vData => 
        {
            const vUserID = vData.MemberID;
            const vMember = vGuild.members.cache.find
            (
                vSearchMember => vSearchMember.user.id == vUserID
            );
            if (vMember) 
            {
                const vUser = vMember.user;
                vHTML += 
                    "<table border='0' width='100%' border='0' cellpadding='0' cellspacing='0'>"+
                        "<tr>"+
                            "<td>" +
                                vRank +
                            "</td>"+
                            "<td>&nbsp;</td>"+
                            "<td>" +
                                "<img valign='middle' src='" +
                                vUser.displayAvatarURL() +
                                "' width='80' height='80' border='0'>" +
                            "</td>"+
                            "<td>&nbsp;</td>"+
                            "<td width='100%'>" +
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
                            "</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td></td>"+
                            "<td></td>"+
                            "<td colspan='3'>" +
                                "<table border='0' width='100%' height='4px' border='0' cellpading='0' cellspacing='0'>"+
                                    "<tr>"+
                                        "<td class='barleft' bgcolor='" +
                                        LPBot.mConfig().Good +
                                        "' width='" +
                                        (vData.Points / (mLevelToPoints(mPointsToLevel(vData.Points) + 1))) * 100 +
                                        "%'>"+
                                        "</td>"+
                                        "<td class='barright' bgcolor='#005500'>"+
                                        "</td>"+
                                    "</tr>"+
                                "</table>"+
                            "</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td colspan='5' height='8px'></td>"+
                        "</tr>"+
                    "</table>";
                vRank++;
            }
        }
    );

    vHTML += "</table>";
    mHTMLFooter();
    response.send(vHTML);
});

app.get
(
    "/participation", 
    (request, response) => 
    {
        while (!LPBot.status === 4) {}
        let vTitle = "";
        if (LPBot.mClient().user) 
        {
            vTitle += LPBot.mClient().user.username;
        } 
        else
        {
            vTitle += "LPBot";
        }
        
        let vHTML = mHTMLHeader(vTitle);
        vHTML +=
            "<H1>"+
                "<table width='100%'>"+
                    "<tr>"+
                        "<td>"+
                            "<img src='" +
                                LPBot.mClient().user.displayAvatarURL() +
                            "' width='80' height='80'></td><td align='left'>" +
                            LPBot.mClient().user.username +
                        "</td>"+
                        "<td width='100%'></td>"+
                    "</tr>"+
                "</table>"+
            "</H1>" +
            "<H2>Classement des points de participations</H2>"+
            "<table border='0' width='100%' border='0' cellpadding='0' cellspacing='0'>";
            let vRank = 1;
            let vGuild = LPBot.mClient().guilds.cache.find
            (
                vGuildFound => vGuildFound.name === "Logique & Programmation"
            );
            const vTop = LPBot.mSQL().prepare
            (
                "SELECT * FROM participations WHERE GuildID = ? ORDER BY Points DESC, MemberTag ASC;"
            ).all(vGuild.id);
        vTop.forEach
        (
            vData => 
            {
                const vUserID = vData.MemberID;
                const vMember = vGuild.members.cache.find
                (
                    vSearchMember => vSearchMember.user.id == vUserID
                );
                if (vMember) 
                {
                    const vUser = vMember.user;
                    vHTML +=
                        "<tr>"+
                            "<td>" +
                                vRank +
                            "</td>"+
                            "<td>&nbsp;</td>"+
                            "<td>" +
                                "<img valign='middle' src='" +
                                vUser.displayAvatarURL() +
                                "' width='80' height='80' border='0'>" +
                            "</td>"+
                            "<td>&nbsp;</td>"+
                            "<td width='100%'>" +
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
                            "</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td></td>"+
                            "<td></td>"+
                            "<td colspan='3'>" +
                                "<table width='100%' height='4px' border='0' cellpading='0' cellspacing='0'>"+
                                    "<tr>"+
                                        "<td class='barleft' bgcolor='" +
                                        LPBot.mConfig().Good +
                                        "' width='" +
                                        (vData.Points / (mLevelToPoints(mPointsToLevel(vData.Points) + 1))) * 100 +
                                        "%'></td>"+
                                        "<td class='barright' bgcolor='#005500'></td>"+
                                    "</tr>"+
                                "</table>"+
                            "</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td colspan='5' height='8px'></td>"+
                        "</tr>";
                    vRank++;
                }
            }
        );

        vHTML += "</table>" + mHTMLFooter();
        response.send(vHTML);
    }
);

app.get("/clccs", (request, response) => 
{
    let vSpace = "&nbsp;";
    let vTabs = "&nbsp;&nbsp;&nbsp;&nbsp;";    
    let vBR = "<BR/>";
    let vHTML = mHTMLHeader("Logique & Programmation : Cross-Language Code CheatSheet");
    //vHTML += HLJS.listLanguages();
    
    vHTML += "<H1>Logique & Programmation : Cross-Language Code CheatSheet</H1>"+
    "<H3>&laquo;Comment apprendre plusieurs langages en même temps...&raquo;</H3>"+
    "<table width='100%' border='1'>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>Op&eacute;rateur</td><td style='text-align: center; vertical-align: middle;'>Langage</td><td width='100%'>Exemple</td></tr>"+
        "<tr><td rowspan=7 style='text-align: center; vertical-align: middle;'>Commentaire</td><td style='text-align: center; vertical-align: middle;'>ASM</td><td><pre><code class='c'>"+
            vTabs + "; commentaire" +
        "</code></pre></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>C</td><td><code class=''>"+
            vTabs + "// Commentaire sur une seule ligne." + vBR +
            vTabs + "// --------------" + vBR +
            vTabs + "/*" + vBR +
            vTabs + vTabs + "Commentaire " + vBR +
            vTabs + vTabs + "sur plusieurs" + vBR +
            vTabs + vTabs + "lignes." + vBR +
            vTabs + "*/" +
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>C++</td><td><code class=''>"+
            vTabs + "// Commentaire sur une seule ligne." + vBR +
            vTabs + "// --------------" + vBR +
            vTabs + "/*" + vBR +
            vTabs + vTabs + "Commentaire " + vBR + 
            vTabs + vTabs + "sur plusieurs" + vBR +
            vTabs + vTabs + "lignes." + vBR +
            vTabs + "*/" +
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>JAVA</td><td><code class=''>"+
            vTabs + "// Commentaire sur une seule ligne." + vBR +
            vTabs + "// --------------" + vBR +
            vTabs + "/*" + vBR +
            vTabs + vTabs + "Commentaire " + vBR +
            vTabs + vTabs + "sur plusieurs" + vBR +
            vTabs + vTabs + "lignes." + vBR +
            vTabs + "*/" +
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>JavaScript</td><td><code class=''>"+
            vTabs + "// Commentaire sur une seule ligne." + vBR +
            vTabs + "// --------------" + vBR +
            vTabs + "/*" + vBR +
            vTabs + vTabs + "Commentaire " + vBR +
            vTabs + vTabs + "sur plusieurs" + vBR +
            vTabs + vTabs + "lignes." + vBR +
            vTabs + "*/" +
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>Lua</td><td><code class=''>"+
            vTabs + "-- Commentaire sur une seule ligne." + vBR +
            vTabs + "-- --------------" + vBR +
            vTabs + "--[[" + vBR +
            vTabs + vTabs + "Commentaire " + vBR +
            vTabs + vTabs + "sur plusieurs" + vBR +
            vTabs + vTabs + "lignes." + vBR +
            vTabs + "]]" +
        "</code></td></tr>" +
        "<tr><td style='text-align: center; vertical-align: middle;'>Python</td><td><code class=''>"+
            vTabs + "# Commentaire sur une seule ligne." + vBR +
            vTabs + "# --------------" + vBR +
            vTabs + "\"\"\"" + vBR +
            vTabs + vTabs + "Commentaire " + vBR +
            vTabs + vTabs + "sur plusieurs" + vBR +
            vTabs + vTabs + "lignes." + vBR +
            vTabs + "\"\"\"" +
        "</code></td></tr>" + 
        "<tr><td rowspan=7 style='text-align: center; vertical-align: middle;'>Additions</td><td style='text-align: center; vertical-align: middle;'>ASM</td><td><pre><code class='c'>"+
            vTabs + "MOV AX,0002h ; AX = 2" + vBR +
            vTabs + "ADD AX,0003h ; AX = AX + 3 = 5" +
        "</code></pre></td></tr>" +
        "<tr><td style='text-align: center; vertical-align: middle;'>C</td><td><code class=''>"+
            vTabs + "int vVariable = 2 + 3;" +
        "</code></td></tr>" +
        "<tr><td style='text-align: center; vertical-align: middle;'>C++</td><td><code class=''>"+
            vTabs + "int vVariable = 2 + 3;" +
        "</code></td></tr>" +
        "<tr><td style='text-align: center; vertical-align: middle;'>JAVA</td><td><code class=''>"+
            vTabs + "int vVariable = 2 + 3;" +
        "</code></td></tr>" +
        "<tr><td style='text-align: center; vertical-align: middle;'>JavaScript</td><td><code class=''>"+
            vTabs + "let vVariable = 2 + 3;" +
        "</code></td></tr>" +
        "<tr><td style='text-align: center; vertical-align: middle;'>Lua</td><td><code class=''>"+
            vTabs + "local vVariable = 2 + 3" +
        "</code></td></tr>" +
        "<tr><td style='text-align: center; vertical-align: middle;'>Python</td><td><code class=''>"+
            vTabs + "vVariable = 2 + 3" +
        "</code></td></tr>" +
        "<tr><td rowspan=7 style='text-align: center; vertical-align: middle;'>Soustractions</td><td style='text-align: center; vertical-align: middle;'>ASM</td><td><pre><code class='c'>"+
            vTabs + "MOV AX,0003h ; AX = 3" + vBR +
            vTabs + "SBB AX,0002h ; AX = AX - 2 = 1" +
        "</code></pre></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>C</td><td><code class=''>"+
            vTabs + "int vVariable = 3 - 2;" +
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>C++</td><td><code class=''>"+
            vTabs + "int vVariable = 3 - 2;" +
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>JAVA</td><td><code class=''>"+
            vTabs + "int vVariable = 3 - 2;" +
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>JavaScript</td><td><code class=''>"+
            vTabs + "let vVariable = 3 - 2;" +
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>Lua</td><td><code class=''>"+
            vTabs + "local vVariable = 3 - 2" +
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>Python</td><td><code class=''>"+
            vTabs + "vVariable = 3 - 2" +
        "</code></td></tr>"+
        "<tr><td rowspan=7 style='text-align: center; vertical-align: middle;'>Division</td><td style='text-align: center; vertical-align: middle;'>ASM</td><td><pre><code class='c'>"+
            vTabs + "MOV AX,0008h ; AX = 8" + vBR +
            vTabs + "MOV BL,0002h ; BL = 2" + vBR +
            vTabs + "DIV BL ; AX = AX / BL = 4" +
        "</code></pre></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>C</td><td><code class=''>"+
            vTabs + "int vVariable = 8 / 2;"+
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>C++</td><td><code class=''>"+
            vTabs + "int vVariable = 8 / 2;"+
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>JAVA</td><td><code class=''>"+
            vTabs + "int vVariable = 8 / 2;"+
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>JavaScript</td><td><code class=''>"+
            vTabs + "let vVariable = 8 / 2;"+
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>Lua</td><td><code class=''>"+
            vTabs + "local vVariable = 8 / 2"+
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>Python</td><td><code class=''>"+
            vTabs + "vVariable = 8 / 2"+
        "</code></td></tr>"+
        "<tr><td rowspan=7 style='text-align: center; vertical-align: middle;'>Division</td><td style='text-align: center; vertical-align: middle;'>ASM</td><td><pre><code class='c'>"+
            vTabs + "MOV AX,0008h ; AX = 8" + vBR +
            vTabs + "MOV BL,0002h ; BL = 2" + vBR +
            vTabs + "DIV BL ; AX = AX / BL = 4" +
        "</code></pre></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>C</td><td><code class=''>"+
            vTabs + "int vVariable = 8 / 2;"+
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>C++</td><td><code class=''>"+
            vTabs + "int vVariable = 8 / 2;"+
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>JAVA</td><td><code class=''>"+
            vTabs + "int vVariable = 8 / 2;"+
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>JavaScript</td><td><code class=''>"+
            vTabs + "let vVariable = 8 / 2;"+
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>Lua</td><td><code class=''>"+
            vTabs + "local vVariable = 8 / 2"+
        "</code></td></tr>"+
        "<tr><td style='text-align: center; vertical-align: middle;'>Python</td><td><code class=''>"+
            vTabs + "vVariable = 8 / 2"+
        "</code></td></tr>"+

    //-------

    "<tr><td style='text-align: center; vertical-align: middle;'>Algorithme</td><td style='text-align: center; vertical-align: middle;'>Langage</td><td>Exemple</td></tr>"+

    "<tr><td rowspan='7' style='text-align: center; vertical-align: middle;'>Test&nbsp;Conditionnel</td><td style='text-align: center; vertical-align: middle;'>ASM</td><td><pre><code>"+    
        vTabs + "IF:" + vBR +
        vTabs + vTabs + "CMP AX, ;&lt;condition&gt;" + vBR +
        vTabs + vTabs + "JZ THEN" + vBR +
        vTabs + "ELSE:" + vBR +
        vTabs + vTabs + "; &lt;expression&gt;" + vBR +
        vTabs + vTabs + "JMP ENDIF" + vBR +
        vTabs + "THEN:" + vBR +
        vTabs + vTabs + "; &lt;expression&gt;" + vBR +
        vTabs + "ENDIF:"+
    "</code></td></tr>"+
    
    "<tr><td style='text-align: center; vertical-align: middle;'>C</td><td><pre><code>"+
        vTabs + "if(/*&lt;condition&gt;*/)" + vBR +
        vTabs + "{" + vBR +
        vTabs + vTabs + "//&lt;expression&gt" + vBR +
        vTabs + "}" + vBR +
        vTabs + "else" + vBR +
        vTabs + "{" + vBR +
        vTabs + vTabs + "//&lt;expression&gt" + vBR +
        vTabs + "}"+
    "</code></td></tr>"+
    "<tr><td style='text-align: center; vertical-align: middle;'>C++</td><td><code class=''>"+
        vTabs + "if(/*&lt;condition&gt;*/)" + vBR +
        vTabs + "{" + vBR +
        vTabs + vTabs + "//&lt;expression&gt;" + vBR +
        vTabs + "}" + vBR +
        vTabs + "else" + vBR +
        vTabs + "{" + vBR +
        vTabs + vTabs + "//&lt;expression&gt;" + vBR +
        vTabs + "}"+
    "</code></pre></td></tr>"+
    "<tr><td style='text-align: center; vertical-align: middle;'>JAVA</td><td><code class=''>"+
        vTabs + "if(/*&lt;condition&gt;*/)" + vBR +
        vTabs + "{" + vBR +
        vTabs + vTabs + "//&lt;expression&gt;" + vBR +
        vTabs + "}" + vBR +
        vTabs + "else" + vBR +
        vTabs + "{" + vBR +
        vTabs + vTabs + "//&lt;expression&gt;" + vBR +
        vTabs + "}"+
    "</code></pre></td></tr>"+
    "<tr><td style='text-align: center; vertical-align: middle;'>JavaScript</td><td><code class=''>"+
        vTabs + "if(/*&lt;condition&gt;*/)" + vBR +
        vTabs + "{" + vBR +
        vTabs + vTabs + "//&lt;expression&gt;" + vBR +
        vTabs + "}" + vBR +
        vTabs + "else" + vBR +
        vTabs + "{" + vBR +
        vTabs + vTabs + "//&lt;expression&gt;" + vBR +
        vTabs + "}"+
    "</code></pre></td></tr>"+
    "<tr><td style='text-align: center; vertical-align: middle;'>Lua</td><td><pre><code class=''>"+
        vTabs + "if --[[ &lt;condition&gt; ]] then" + vBR +
        vTabs + vTabs + "-- &lt;expression&gt;" + vBR +
        vTabs + "else<BR/>"+
        vTabs + vTabs + "-- &lt;expression&gt;" + vBR +
        vTabs + "end"+
    "</code></pre></td></tr>"+
    "<tr><td style='text-align: center; vertical-align: middle;'>Python</td><td><pre><code class=''>"+
        vTabs + "if ''' &lt;condition&gt; ''' :" + vBR +
        vTabs + vTabs + "#&lt;expression&gt;" + vBR +
        vTabs + "else" + vBR +
        vTabs + vTabs + "#&lt;expression&gt;" + 
    "</code></pre></td></tr>"+
    "</table>"

    vHTML += mHTMLFooter();
    response.send(vHTML);
});


app.get
(
    "/musics",
    (request, response) => 
    {
        let vHTML = mHTMLHeader("Musics on Stream");
        vHTML += `<H1>Musics on Stream :</H1>
        <H2>Following titles may be played on stream randomly at anytime :</H2>
        <TABLE width='100%' border="1">
            <TR width='100%'>
                <TD><H3>Title</H3></TD>
                <TD><H3>Artist</H3></TD>
                <TD><H3>Licence</H3></TD>
                <TD><H3>Links</H3></TD>
            </TR>`;
        const vData = LPBot.mSQL().Database.Tracks.mSelectAll()
        vData.forEach
        (
            vLine =>
            {
                const vLinks = vLine.Links.split(" ");
                vHTML += `<TR width='100%'>
                    <TD>${vLine.Title}</TD>
                    <TD>${vLine.Artist}</TD>
                    <TD><a href='${vLine.LicenceURL}'><img class='cc' src='${vLine.LicenceImageURL}'></a></TD>
                    <TD>`
                vLinks.forEach
                (
                    vLink=>
                    {
                        vHTML += `<a href='${vLink}'>${vLink}</a><BR/>`
                    }
                )
                vHTML += `</TD>
                </TR>`    
            }
        )
        vHTML += `</TABLE>`

        vHTML += mHTMLFooter();
        response.send(vHTML);
    }
);
/*
app.get
(
    "/backmusics",
    (request, response) => 
    {
        let vHTML = mHTMLHeader("Musics on Stream");
        vHTML += `<H1>Musics on Stream :</H1>
        <H2>Following titles may be played on stream randomly at anytime :</H2>
        <TABLE width='100%' border="1">
            <TR width='100%'>
                <TD><H3>ID</H3></TD>
                <TD><H3>Title</H3></TD>
                <TD><H3>Artist</H3></TD>
                <TD><H3>Licence</H3></TD>
                <TD><H3>Links</H3></TD>
            </TR>`;
        const vData = LPBot.mSQL().Database.Tracks.mSelectAll()
        vData.forEach
        (
            vLine =>
            {
                const vLinks = vLine.Links.split(" ");
                vHTML += `<TR width='100%'>
                    <TD>${vLine.rowid}</TD>
                    <TD>${vLine.Title}</TD>
                    <TD>${vLine.Artist}</TD>
                    <TD>${vLine.LicenceImageURL} ${vLine.LicenceURL} </TD>
                    <TD>${vLinks}`
                
                vHTML += `</TD>
                </TR>`    
            }
        )
        vHTML += `</TABLE>`

        vHTML += mHTMLFooter();
        response.send(vHTML);
    }
);
*/