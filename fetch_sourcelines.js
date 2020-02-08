const kuromoji = require('kuromoji');
const fs = require('fs');
const english = /^[A-Za-z0-9]*$/;
const strict_sym = /[!-\/:-@[-`{-~]/;

function fetch_sourcelines(impmsg){
    if(strict_sym.test(impmsg) === false){
        kuromoji.builder({ dicPath: "./node_modules/kuromoji/dict" }).build(function (err, tokenizer) {
            let source = tokenizer.tokenize(impmsg);
            source.forEach(item => {
                const srclines = fs.readFileSync('srclines.txt').toString().split("\n");
                if(item.pos === '名詞' && item.pos_detail_1 !== '接尾'){
                    if(english.test(item.surface_form) === false){
                        let regline = impmsg.replace(item.surface_form, "${word}")
                        if(srclines.includes(regline) === false){
                            fs.appendFile('srclines.txt', `${regline}\n`, (err) => {
                            if (err) throw err;
                            });
                        }
                    }else{
                        // Record rejected line for reference.
                        fs.appendFile('rejectedsrc_eng.txt', `${impmsg}\n`, (err) => {
                            if (err) throw err;
                        });
                    }
                }
            });
        });
    }else{
        // Record rejected line for reference.
        fs.appendFile('rejectedsrc_stirctsym.txt', `${impmsg}\n`, (err) => {
            if (err) throw err;
        });
    }
}
    
module.exports = fetch_sourcelines;