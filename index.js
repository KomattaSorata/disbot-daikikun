const kuromoji = require('kuromoji');

kuromoji.builder({ dicPath: "./node_modules/kuromoji/dict" }).build(function (err, tokenizer) {
    // tokenizer is ready
    let source = tokenizer.tokenize("すもももももももものうち");
    source.forEach(function(item){
        if(item.pos === '名詞' || item.pos_detail_1 === '一般'){
            console.log(item.surface_form);
        } else {
            
        };
    })
});