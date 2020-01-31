const kuromoji = require('kuromoji');
const fs = require('fs');
const sourcewords = fs.readFileSync('sourcewords.txt').toString().split("\n");

function fetch_sourcewords(){kuromoji.builder({ dicPath: "./node_modules/kuromoji/dict" }).build(function (err, tokenizer) {
    // tokenizer is ready
    let source = tokenizer.tokenize("すもももももももものうち");
    source.forEach(function(item){
        if(item.pos === '名詞' || item.pos_detail_1 === '一般'){
            console.log(item.surface_form);
            if(sourcewords.includes(item.surface_form) === true){
                //  NOTHING HERE
            } else {
                fs.appendFile('sourcewords.txt', `${item.surface_form}\n`, (err) => {
                    if (err) throw err;
                });
            }
        } else {
            //  NOTHING HERE
        };
    })
});}

module.exports = fetch_sourcewords;