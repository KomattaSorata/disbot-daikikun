const fetch_sourcewords = require('./fetch_sourcewords');
const fetch_sourcelines = require('./fetch_sourcelines');
const mibunshou = require('./env_config');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`いってらっしゃい、僕のパイロットさん。`);
});

client.on('message', msg => {
    if(msg.author.bot === false){fetch_sourcewords(msg.content);}
});

client.on('message', msg => {
  if(msg.author.bot === false){fetch_sourcelines(msg.content);}
});

client.setInterval( () => {
    const srcwords = fs.readFileSync('srcwords.txt').toString().split("\n");
    const word = srcwords[Math.floor(Math.random() * srcwords.length)];
    const srclines = fs.readFileSync('srclines.txt').toString().split("\n");
    const generatedMessage = srclines[Math.floor(Math.random() * srclines.length)].replace("${word}", word);
    client.channels.get(mibunshou.channelid).send(generatedMessage)
}, 60000);

client.login(mibunshou.discord_token);