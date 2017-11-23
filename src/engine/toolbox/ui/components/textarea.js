import { Rectangle } from 'pixi.js';
import { TextStyle } from 'pixi.js';
import { TextMetrics } from 'pixi.js';

class Textarea extends require('../typable-component'){
    constructor(u, text='', options={}) {
        if(options.margin===undefined)options.margin=2;
        options.style = !!options.style ? options.style : u.FontOptions
        options.style.wordWrap = true;
        options.style.wordWrapWidth = options.bounds.width;
        options.component_type = 'textbox';
        super(u, '', options);

        this._numOfLines = 1;

    }

    _onType(){
        super._onType();
        let metric = TextMetrics.measureText(this.value,this._style);
        if(this._numOfLines != metric.lineWidths.length){
            this._numOfLines = metric.lineWidths.length;
            this.resize(this.width, this._numOfLines * metric.lineHeight)
            this._background.updateTransform();
        }
    }

    _moveCursor(dir){

    }

}

module.exports = (...args)=>{
    //do arguements control here
    return new Textarea(...args);
}
