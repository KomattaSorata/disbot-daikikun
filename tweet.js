const mibunshou = require('./env_config');
const fs = require('fs');
const Twitter = require('twitter');

const TwitterClient = new Twitter({
  consumer_key: mibunshou.twitter_consumer_key,
  consumer_secret: mibunshou.twitter_consumer_secret,
  access_token_key: mibunshou.twitter_access_token_key,
  access_token_secret: mibunshou.twitter_access_token_secret
});

function tweet() {
    const srcwords = fs.readFileSync('srcwords.txt').toString().split("\n");
    const word = srcwords[Math.floor(Math.random() * srcwords.length)];
    const srclines = fs.readFileSync('srclines.txt').toString().split("\n");
    const generatedMessage = srclines[Math.floor(Math.random() * srclines.length)].replace("${word}", word);
    TwitterClient.post('statuses/update', {status: generatedMessage}, function(error, tweet, response) {
      if (!error) {
          console.log(generatedMessage);
      }
    });
}

setInterval(tweet, 1800000);