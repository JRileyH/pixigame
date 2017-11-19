class Checkbox extends require('../ui-component'){
    constructor(u, text='', options={}) {
        super(u, options);
        this._text = this._ui.Label(text).create(this);
        this._text.Bounds.x = this._bounds._width+10;

        this._background = new PIXI.Sprite();
        this._background.x = 0;
        this._background.y = 0;
        this._background.width = this._bounds._width;
        this._background.height = this._bounds._height;
        this._background_state = {
            plain: (typeof options.texture != "undefined" && typeof options.texture.background != "undefined" && options.texture.background.plain ) ? options.texture.background.plain : this._ui._default_textures.checkbox.background.plain,
            hover: (typeof options.texture != "undefined" && typeof options.texture.background != "undefined" && options.texture.background.hover ) ? options.texture.background.hover : this._ui._default_textures.checkbox.background.hover,
            click: (typeof options.texture != "undefined" && typeof options.texture.background != "undefined" && options.texture.background.click ) ? options.texture.background.click : this._ui._default_textures.checkbox.background.click
        }
        this._background.texture = this._background_state['plain'];

        this._checked = false;
        this._mark = new PIXI.Sprite();
        this._mark.x = 5;
        this._mark.y = 5;
        this._mark.width = this._bounds._width-10;
        this._mark.height = this._bounds._height-10;
        this._mark.texture = (typeof options.texture != "undefined" && typeof options.texture.mark != "undefined") ? options.texture.mark : this._ui._default_textures.checkbox.mark;
        this._mark.visible = false;
    }

    create(parent) {
        super.create(parent);

        let overloaded_click = ()=>{
            if(this._checked){
                this.uncheck();
            } else {
                this.check();
            }
            if(typeof(this._options.click)!=='function') this._options.click(this._checked);
        }

        this._setClick(overloaded_click, this._options.mouse_activator);
        this._setEnter(this._options.enter);
        this._setExit(this._options.exit);
        if(this._options.keyboard_activator) this._setKey(overloaded_click, this._options.keyboard_activator);

        this._bounds.addChild(this._background,this._text.Bounds, this._mark);
        return this;
    }

    check(){
        this._mark.visible = true;
        this._checked = true;
    }
    uncheck(){
        this._mark.visible = false;
        this._checked = false;
    }

    get value(){
        return this._checked;
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
    return new Checkbox(...args);
}
