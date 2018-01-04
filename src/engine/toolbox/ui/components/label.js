import { TextStyle } from 'pixi.js';

class Label extends require('../ui-component'){
    constructor(u, text='', options={}) {
        super(u, options);
        this._style = !!options.style ? new TextStyle(options.style) : new TextStyle(u.FontOptions)
        this._text = new PIXI.Text(text, this._style);
    }

    create(parent) {
        super.create(parent);
        this.Container.addChild(this._text);
        return this;
    }

    setText(newText){
        this._text.text = newText;
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Label(...args);
}
