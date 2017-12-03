import { Rectangle } from 'pixi.js';
import { TextStyle } from 'pixi.js';
import { TextMetrics } from 'pixi.js';

class Textbox extends require('../typable-component'){
    constructor(u, text='', options={}) {
        if(options.margin===undefined)options.margin=2;
        options.style = !!options.style ? options.style : u.FontOptions
        options.component_type = 'textbox';
        super(u, text, options);
    }

    moveMask(){
        this._mask = new PIXI.Graphics();
        this._mask.drawRect(this.Container.worldTransform.tx,this.Container.worldTransform.ty,this._background._width,this._background._height);
        this.Container.mask = this._mask;
    }

    _onType(){
        super._onType();
        let metric = TextMetrics.measureText(this._pre_str,this._style);
        let delta = metric.width-this._background.width+(this._options.margin*2)
        if(delta>-this._options.margin) { // text too big for box
            if(this._cursor.x !== this._background.width-this._options.margin) this._cursor.x = this._background.width-this._options.margin;
            this._text.Container.x -= delta + this._text.Container.x
        } else { // text within bounds
            if(this._text.Container.x!==this._options.margin) this._text.Container.x=this._options.margin;
            this._cursor.x = metric.width+2;
        }
    }
    _moveCursor(dir){
        if(typeof(dir)==='string'){
            switch(dir){
                case 'left':
                if(this._pre_str.length>0){
                    let char = this._pre_str.substr(-1);
                    this._pre_str = this._pre_str.substr(0,this._pre_str.length-1);
                    this._post_str = char+this._post_str;
                }
                break;
                case 'right':
                if(this._post_str.length>0){
                    let char = this._post_str.substr(0,1);
                    this._post_str = this._post_str.slice(1);
                    this._pre_str = this._pre_str+char;
                 }
                break;
            }
        }
    }
   

    tick(){
        super.tick();
        this.moveMask()
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Textbox(...args);
}
