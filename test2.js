client.on('message', msg => 
{
	//----------------------------------------------- 🍪 cookie
	var dejaadd = 0;
	var pasperm = 0;
	if (msg.content.includes(`🍪 new cookie `))
	{
		console.log("nouveau gif, catégorie: COOKIE")
		perm.forEach((item, index, array ) =>
		{ 
			var alreadyadd = 0;
			if (perm.includes(msg.author.id))
			{
				var newck = `${msg.content}`
				cookie.forEach((item, index, array ) =>
				{ 
					if (msg.content.includes(cookie[index]))
					{
						alreadyadd = 1;
					}
				})
		
				if (alreadyadd === 0) 
				{   
					cookie[`${cookie.length}`] = `${newck.slice(14)}`;
					msg.channel.send(`${msg.author} gif capturé! \n\Il ressemble à ça: ${cookie[cookie.length - 1]}`);

					fs.writeFile('cookie.json', `${JSON.stringify(cookie)}`, err => 
					{
						console.error(err);
					});
				}
				if (alreadyadd === 1)
				{
					dejaadd = 1;
				}
			}
			else 
			{
				pasperm = 1;
			}
		});
	}
	if (dejaadd === 1) 
	{
		msg.channel.send("Désolée, mais il a déjà été ajouté. ^^");
	}
	if (pasperm === 1) 
	{
		msg.channel.send("Désolée, tu n'a pas les permissions requises.");
	}
});