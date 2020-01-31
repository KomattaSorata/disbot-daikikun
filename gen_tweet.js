const fs = require('fs');
const sourcewords = fs.readFileSync('sourcewords.txt').toString().split("\n");
const word = sourcewords[Math.floor(Math.random() * sourcewords.length)];
const sourcelines = [
    `${word}？ああ知ってるよ美味しいよね！`,
    `${word}？それなら昨日食べたわ！`,
    `${word}？それなら俺の隣で寝てるぜ！`,
    `${word}ってすごいのよ！`,
    `美味しいかな。。。${word}。`,
    `${word}寄越してくれるのなら、どうぞどうぞ(   ◜ω◝ )`,
    `${word}が欲しいの｡ﾟ(ﾟ´Д｀ﾟ)ﾟ｡`,
    `なんが面白い${word}ありますか？`,
    `${word}は確かにすごい✌︎('ω'✌︎ )`,
    `${word}の方がいいかな。。。`,
    `${word}を予約したwww`,
];
const generatedTweet = sourcelines[Math.floor(Math.random() * sourcelines.length)]
module.exports = generatedTweet;