class Button extends require('../ui-component'){
    constructor(u, text='', options={}) {
        super(u, options);
        this._text = this._ui.Label(text).create(this);
        this._background = new PIXI.Sprite();
        this._background.x = 0;
        this._background.y = 0;
        this._background.width = this._bounds._width;
        this._background.height = this._bounds._height;
        this._background_state = {
            plain: (typeof options.texture != "undefined" && options.texture.plain ) ? options.texture.plain : PIXI.Texture.from("data:image/gif;base64,R0lGODlhAQABAPAAAJmZmf///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="),
            hover: (typeof options.texture != "undefined" && options.texture.hover ) ? options.texture.hover : PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAALu7u////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
            click: (typeof options.texture != "undefined" && options.texture.click ) ? options.texture.click : PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAERERP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        }
        this._background.texture = this._background_state['plain'];

        this._setClick(options.click, options.mouse_activator);
        this._setEnter(options.enter);
        this._setExit(options.exit);
        if(options.keyboard_activator) this._setKey(options.click, options.keyboard_activator);
    }

    create(parent) {
        super.create(parent);
        this._bounds.addChild(this._background,this._text.Bounds);
        return this;
    }
    
    _setClick(fn=()=>{}, btn=0) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        if(typeof(btn)!=='number') throw Error('button value must be function');
        this._options.click = fn;
        this.setMouseAction(btn,"press",()=>{
            this._background.texture = this._background_state['click'];
        }, { bounds: this._bounds });
        this.setMouseAction(btn,"release",()=>{
            this._background.texture = this._background_state['hover'];
            fn();
        }, { bounds: this._bounds });
    }
    _setKey(fn=()=>{}, key) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        if(typeof(key)!=='number') throw Error('key value must be function');
        this.setKeyAction(key,"press",()=>{
            this._background.texture = this._background_state['click'];
        });
        this.setKeyAction(key,"release",()=>{
            this._background.texture = this._background_state['plain'];
            fn()
        });
    }

    _setEnter(fn=()=>{}) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        this.setMouseAction(1,"hover",()=>{
            this._background.texture = this._background_state['hover'];
            fn();
        }, { bounds: this._bounds, fireOnlyOnceWhileInBounds: true });
    }
    _setExit(fn=()=>{}) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        this.setMouseAction(2,"hover",()=>{
            this._background.texture = this._background_state['plain'];
            fn();
        }, { bounds: this._bounds, fireOnlyOnceWhileInBounds: true });
    }

}

module.exports = (...args)=>{
    //do arguements control here
    return new Button(...args);
}
