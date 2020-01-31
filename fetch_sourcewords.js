const kuromoji = require('kuromoji');
const fs = require('fs');
const english = /^[A-Za-z0-9]*$/;

function fetch_sourcewords(impmsg){kuromoji.builder({ dicPath: "./node_modules/kuromoji/dict" }).build(function (err, tokenizer) {
    // tokenizer is ready
    let source = tokenizer.tokenize(impmsg);
    source.forEach(function(item){
        const srcwords = fs.readFileSync('srcwords.txt').toString().split("\n");
        if(item.pos === '名詞' && item.pos_detail_1 !== '接尾'){
            if(english.test(item.surface_form) === false){
                if(srcwords.includes(item.surface_form) === false){
                    fs.appendFile('srcwords.txt', `${item.surface_form}\n`, (err) => {
                        if (err) throw err;
                    });
                }
            }
        }
    })
});}

module.exports = fetch_sourcewords;