class Label extends require('../ui-component'){
    constructor(u, text='', options={}) {
        super(u, options);
        this._text = new PIXI.Text(text, u.FontOptions);
    }

    create(parent) {
        super.create(parent);
        this._bounds.addChild(this._text);
        return this;
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Label(...args);
}
