import { Rectangle } from 'pixi.js';

class Textbox extends require('../clickable-component'){
    constructor(u, text='', options={}) {
        options.component_type = 'textbox';
        super(u, text, options);
        this._focus_outline = this._createContainer(new Rectangle(-2,-2,this._bounds._width+4,this._bounds._height+4), u._default_textures.textbox.focus);
        this._focus_outline.visible = false;
        this._focused = false;

        this._options.click = ()=>{
            if(!this._focused) this.focus();
            if(typeof(options.click)!=='function') options.click(this._checked);
        }
        this.setMouseAction(this._options.mouse_activator||0,"press",()=>{
            this.unfocus();
        }, { bounds: this._background, inverted: true});
    }

    create(parent){
        super.create(parent);
        this._bounds.addChild(this._focus_outline);
        //set z-index to back
        this._bounds.children.unshift(this._bounds.children.pop());
        return this;
    }

    focus(){
        this._focus_outline.visible = true;
        this._focused = true;
    }
    unfocus(){
        this._focus_outline.visible = false;
        this._focused = false;
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Textbox(...args);
}
