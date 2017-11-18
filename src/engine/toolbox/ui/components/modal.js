class Modal extends require('../ui-component'){
    constructor(u, text='', options={}) {
        super(u, options);
        
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Modal(...args);
}


/*
    class Button extends require('../ui-component'){
    constructor(u, text='', options={}) {
        super(u, options);
        this._options = options;
        this._text = new PIXI.Text(text, u.FontOptions);
        this._sprite = new PIXI.Sprite();
        this._sprite.x = 0;
        this._sprite.y = 0;
        this._sprite.width = this._bounds._width;
        this._sprite.height = this._bounds._height;
        this._sprite_state = {
            plain: (typeof options.texture != "undefined" && options.texture.plain ) ? options.texture.plain : PIXI.Texture.from("data:image/gif;base64,R0lGODlhAQABAPAAAJmZmf///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="),
            hover: (typeof options.texture != "undefined" && options.texture.hover ) ? options.texture.hover : PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAALu7u////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
            click: (typeof options.texture != "undefined" && options.texture.click ) ? options.texture.click : PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAERERP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        }
        this._sprite.texture = this._sprite_state['plain'];

        this._setClick(options.click, options.mouse_activator);
        this._setEnter(options.enter);
        this._setExit(options.exit);
        if(options.keyboard_activator) this._setKey(options.click, options.keyboard_activator);
    }

    create() {
        super.create();
        this._bounds.addChild(this._sprite,this._text);
        return this;
    }

    _setClick(fn=()=>{}, btn=0) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        if(typeof(btn)!=='number') throw Error('button value must be function');
        this._options.click = fn;
        this.setMouseAction(btn,"press",()=>{
            this._sprite.texture = this._sprite_state['click'];
        }, { bounds: this._bounds });
        this.setMouseAction(btn,"release",()=>{
            this._sprite.texture = this._sprite_state['hover'];
            fn();
        }, { bounds: this._bounds });
    }
    _setKey(fn=()=>{}, key) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        if(typeof(key)!=='number') throw Error('key value must be function');
        this.setKeyAction(key,"press",()=>{
            this._sprite.texture = this._sprite_state['click'];
        });
        this.setKeyAction(key,"release",()=>{
            this._sprite.texture = this._sprite_state['plain'];
            fn()
        });
    }

    _setEnter(fn=()=>{}) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        this.setMouseAction(1,"hover",()=>{
            this._sprite.texture = this._sprite_state['hover'];
            fn();
        }, { bounds: this._bounds, fireOnlyOnceWhileInBounds: true });
    }
    _setExit(fn=()=>{}) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        this.setMouseAction(2,"hover",()=>{
            this._sprite.texture = this._sprite_state['plain'];
            fn();
        }, { bounds: this._bounds, fireOnlyOnceWhileInBounds: true });
    }

}

module.exports = (...args)=>{
    //do arguements control here
    return new Button(...args);
}

*/