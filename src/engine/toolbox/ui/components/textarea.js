import { Rectangle } from 'pixi.js';
import { TextStyle } from 'pixi.js';
import { TextMetrics } from 'pixi.js';

class Textbox extends require('../clickable-component'){
    constructor(u, text='', options={}) {
        if(options.margin===undefined)options.margin=2;
        options.component_type = 'textbox';
        super(u, '', options);

        this._style = !!options.style ? new TextStyle(options.style) : new TextStyle(u.FontOptions)
        this._focus_outline = this._createContainer(new Rectangle(-options.margin,-options.margin,this._bounds._width+(options.margin*2),this._bounds._height+(options.margin*2)), u._default_textures.textbox.focus);
        this._focus_outline.visible = false;
        this._pre_str = text;
        this._post_str = '';

        this._cursor = this._createContainer(new Rectangle(TextMetrics.measureText(this._pre_str,this._style).width+options.margin,options.margin,1,this._bounds._height-(options.margin*2)), u._default_textures.textbox.focus);
        this._cursor.visible = false;

        this._text = this._ui.Label(this.value).create(this);

        this._focused = false;

        this._options.click = ()=>{
            if(!this._focused) this.focus();
            if(typeof(options.click)!=='function') options.click(this._checked);
        }
        this.setMouseAction(this._options.mouse_activator||0,"press",()=>{
            this.unfocus();
        }, { bounds: this._background, inverted: true});

        this._submit = typeof(options.submit)==='function'? options.submit : function(){}

        this.submit = () => {
            this.unfocus();
            this._submit(this.value);
        }

        window.addEventListener("keydown", event=>{
            if(this._focused){
                if(event.key.length===1){
                    this._addText(event.key);
                } else if(event.key==='Backspace'){
                    this._delText();
                } else if(event.key==='ArrowLeft'){
                    this._moveCursor('left');
                } else if(event.key==='ArrowRight'){
                    this._moveCursor('right');
                } else if(event.key==='Enter'){
                    this.submit(this.value);
                }
                event.preventDefault();
            }
        });
    }

    create(parent){
        super.create(parent);
        this._bounds.addChild(this._focus_outline);
        //set z-index to back
        this._bounds.children.unshift(this._bounds.children.pop());
        this._bounds.addChild(this._text.Bounds, this._cursor);
        return this;
    }

    get value(){
        return this._pre_str+this._post_str;
    }

    _placeCursor(){
        let metric = TextMetrics.measureText(this._pre_str,this._style);
        this._cursor.x = metric.width+2;
    }
    _moveCursor(dir){
        if(typeof(dir)==='string'){
            switch(dir){
                case 'left':
                if(this._pre_str.length>0){
                    let char = this._pre_str.substr(-1);
                    this._pre_str = this._pre_str.substr(0,this._pre_str.length-1);
                    this._post_str = char+this._post_str;
                }
                break;
                case 'right':
                if(this._post_str.length>0){
                    let char = this._post_str.substr(0,1);
                    this._post_str = this._post_str.slice(1);
                    this._pre_str = this._pre_str+char;
                 }
                break;
            }
            this._text.setText(this.value);
            this._placeCursor();
        }
    }
    _addText(char){
        this._pre_str+=char;
        this._text.setText(this.value);
        this._placeCursor();
    }
    _delText(){
        if(this._pre_str.length>0){
            this._pre_str = this._pre_str.slice(0, -1);
            this._text.setText(this.value);
            this._placeCursor();
        }
    }
    focus(){
        this._focus_outline.visible = true;
        this._cursor.visible = true;
        this._focused = true;
    }
    unfocus(){
        this._focus_outline.visible = false;
        this._cursor.visible = false;
        this._focused = false;
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Textbox(...args);
}
