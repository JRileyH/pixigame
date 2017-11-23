class Label extends require('../ui-component'){
    constructor(u, text='', options={}) {
        super(u, options);
        this._text = new PIXI.Text(text, u.FontOptions);
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
