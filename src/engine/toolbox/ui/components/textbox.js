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
        let delta = this._pre_metric.width-this._background.width+(this._options.margin*2)
        if(delta>-this._options.margin) { // text too big for box
            if(this._cursor.x !== this._background.width-this._options.margin) this._cursor.x = this._background.width-this._options.margin;
            this._text.Container.x -= delta + this._text.Container.x
        } else { // text within bounds
            if(this._text.Container.x!==this._options.margin) this._text.Container.x=this._options.margin;
            this._cursor.x = this._pre_metric.width+2;
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
