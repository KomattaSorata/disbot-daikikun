const fetch_sourcewords = require('./fetch_sourcewords');
const fetch_sourcelines = require('./fetch_sourcelines');
const mibunshou = require('./env_config');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const Twitter = require('twitter');

const TwitterClient = new Twitter({
  consumer_key: mibunshou.twitter_consumer_key,
  consumer_secret: mibunshou.twitter_consumer_secret,
  access_token_key: mibunshou.twitter_access_token_key,
  access_token_secret: mibunshou.twitter_access_token_secret
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`いってらっしゃい、僕のパイロットさん。`);
});

client.on('message', msg => {
    if(msg.author.bot === false){fetch_sourcewords(msg.content);}
});

client.on('message', msg => {
  if(msg.author.bot === false){
    if(msg.content.includes("。") || msg.content.includes("「") || msg.content.includes( "」")){
      // Prohibit function for potential long text, avoiding complex and low accuracy processing.
      // The risk of hitting low accuracy content is low but this is the way to go for now.
      // Record rejected line for reference.
      fs.appendFile('rejectedsrc.txt', `${msg.content}\n`, (err) => {
        if (err) throw err;
      });
    }else if(msg.content.includes("\n")){
      let chopped = msg.content.split(/\r?\n/);
      chopped.forEach(item => {
        fetch_sourcelines(item);
      });
    }else{
      fetch_sourcelines(msg.content);}
    }
});

client.setInterval( () => {
  const srcwords = fs.readFileSync('srcwords.txt').toString().split("\n");
  const word = srcwords[Math.floor(Math.random() * srcwords.length)];
  const srclines = fs.readFileSync('srclines.txt').toString().split("\n");
  const generatedMessage = srclines[Math.floor(Math.random() * srclines.length)].replace("${word}", word);
  TwitterClient.post('statuses/update', {status: generatedMessage}, function(error, tweet, response) {
    if (!error) {}
  });
}, 1800000);

client.on('message', msg => {
  if(msg.author.id === mibunshou.userid_manage && msg.channel.type === "dm"){
    if(msg.content === '!exit'){
      process.exit(0);
    }else if(msg.content === '!count'){
      const srcwords = fs.readFileSync('srcwords.txt').toString().split("\n");
      const srclines = fs.readFileSync('srclines.txt').toString().split("\n");
      const StatusMsg_Count = `ただいま単語${srcwords.length}件と文型${srclines.length}件が登録されています。`;
      msg.reply(StatusMsg_Count);
    };
  }
});

client.login(mibunshou.discord_token);