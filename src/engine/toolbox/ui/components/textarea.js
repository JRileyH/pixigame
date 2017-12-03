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
        super(u, text, options);

        this._numOfLines = 1;
        this._currentLine = 0;
    }

    _onType(){
        super._onType();
        let metric = TextMetrics.measureText(this.value,this._style);
        if(this._numOfLines != metric.lineWidths.length){
            this._numOfLines = metric.lineWidths.length;
            this.resize(this.width, this._numOfLines * metric.lineHeight)
        }
        metric = TextMetrics.measureText(this._pre_str,this._style);
        this._currentLine = metric.lineWidths.length-1;
        this._cursor.x = metric.lineWidths[this._currentLine]+this._options.margin
        this._cursor.y = (metric.lineHeight*this._currentLine)+this._options.margin;
    }

    _moveCursor(dir){
        if(typeof(dir)==='string'){
            switch(dir){
                case 'left':
                if(this._pre_str.length > 0){
                    let char = this._pre_str.substr(-1);
                    this._pre_str = this._pre_str.substr(0,this._pre_str.length-1);
                    this._post_str = char+this._post_str;
                }
                break;
                case 'right':
                if(this._post_str.length > 0){
                    let char = this._post_str.substr(0,1);
                    this._post_str = this._post_str.slice(1);
                    this._pre_str = this._pre_str+char;
                }
                break;
                case 'up':
                if(this._currentLine > 0){
                   let  metric = TextMetrics.measureText(this._pre_str,this._style);
                   let ln = metric.text.length - metric.lines[--this._currentLine].length;
                   let str = this.value;
                   this._pre_str = str.substr(0,ln);
                   this._post_str = str.substr(ln,str.length-1);
                }
                break;
                case 'down':
                if(this._currentLine+1 < this._numOfLines){
                    //let  metric = TextMetrics.measureText(this._post_str,this._style);
                    //let ln = this._pre_str.length - metric.lines[++this._currentLine].length;
                    //let str = this.value;
                    //this._pre_str = str.substr(0,ln);
                    //this._post_str = str.substr(ln,str.length-1);
                }
                break;
            }
        }
    }

}

module.exports = (...args)=>{
    //do arguements control here
    return new Textarea(...args);
}
