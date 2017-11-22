module.exports = class ClickableComponent extends require('./ui-component'){
    constructor(u, text, options) {
        if(options.texture === undefined) options.texture = {};
        if(options.texture.background === undefined) options.texture.background = {};
        options.texture.background.plain = options.texture.background.plain || u._default_textures[options.component_type].background.plain
        options.texture.background.hover = options.texture.background.hover || u._default_textures[options.component_type].background.hover
        options.texture.background.click = options.texture.background.click || u._default_textures[options.component_type].background.click
        super(u, options)
        
        if(typeof(text==='string') && text.length>0) this._text = this._ui.Label(text).create(this);

        this._background = this._createContainer(new PIXI.Rectangle(0, 0, this._bounds._width, this._bounds._height), options.texture.background.plain)
        this._background_state = options.texture.background;
    }

    create(parent) {
        super.create(parent);
        this._setClick(this._options.click, this._options.mouse_activator);
        this._setEnter(this._options.enter);
        this._setExit(this._options.exit);
        if(this._options.keyboard_activator) this._setKey(this._options.click, this._options.keyboard_activator);

        this._bounds.addChild(this._background);
        if(!!this._text) this._bounds.addChild(this._text.Bounds);
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
        }, { bounds: this._background});
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
        this.setMouseAction(0,"hover",()=>{
            if(!this._disabled) {
                this._background.texture = this._background_state['hover'];
                fn();
            }
        }, { bounds: this._background, fireOnlyOnceWhileInBounds: true });
    }
    _setExit(fn=()=>{}) {
        if(typeof(fn)!=='function') throw Error('click value must be function');
        this.setMouseAction(1,"hover",()=>{
            if(!this._disabled) {
                this._background.texture = this._background_state['plain'];
                fn();
            }
        }, { bounds: this._background, fireOnlyOnceWhileInBounds: true, inverted: true});
    }
}
