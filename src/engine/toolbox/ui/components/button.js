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
            plain: (typeof options.texture != "undefined" && options.texture.plain ) ? options.texture.plain : this._ui._default_textures.button.background.plain,
            hover: (typeof options.texture != "undefined" && options.texture.hover ) ? options.texture.hover : this._ui._default_textures.button.background.hover,
            click: (typeof options.texture != "undefined" && options.texture.click ) ? options.texture.click : this._ui._default_textures.button.background.click
        }
        this._background.texture = this._background_state['plain'];
    }

    create(parent) {
        super.create(parent);

        this._setClick(this._options.click, this._options.mouse_activator);
        this._setEnter(this._options.enter);
        this._setExit(this._options.exit);
        if(this._options.keyboard_activator) this._setKey(this._options.click, this._options.keyboard_activator);

        this._bounds.addChild(this._background,this._text.Bounds);
        return this;
    }

    enable(){
        super.enable();
        this._background.texture = this._background_state['plain'];
    }
    disable(){
        super.disable();
        //set background to disable state
    }
    
    _setClick(fn=()=>{}, btn=0) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        if(typeof(btn)!=='number') throw Error('button value must be function');
        this._options.click = fn;
        this.setMouseAction(btn,"press",()=>{
            if(!this._disabled) {
                this._background.texture = this._background_state['click'];
            }
        }, { bounds: this._background });
        this.setMouseAction(btn,"release",()=>{
            if(!this._disabled) {
                this._background.texture = this._background_state['hover'];
                fn();
            }
        }, { bounds: this._background });
    }
    _setKey(fn=()=>{}, key) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        if(typeof(key)!=='number') throw Error('key value must be function');
        this.setKeyAction(key,"press",()=>{
            if(!this._disabled) {
                this._background.texture = this._background_state['click'];
            }
        });
        this.setKeyAction(key,"release",()=>{
            if(!this._disabled) {
                this._background.texture = this._background_state['plain'];
                fn()
            }
        });
    }

    _setEnter(fn=()=>{}) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        this.setMouseAction(1,"hover",()=>{
            if(!this._disabled) {
                this._background.texture = this._background_state['hover'];
                fn();
            }
        }, { bounds: this._background, fireOnlyOnceWhileInBounds: true });
    }
    _setExit(fn=()=>{}) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        this.setMouseAction(2,"hover",()=>{
            if(!this._disabled) {
                this._background.texture = this._background_state['plain'];
                fn();
            }
        }, { bounds: this._background, fireOnlyOnceWhileInBounds: true });
    }

}

module.exports = (...args)=>{
    //do arguements control here
    return new Button(...args);
}
