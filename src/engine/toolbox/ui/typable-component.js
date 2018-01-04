import { Rectangle } from 'pixi.js';
import { TextStyle } from 'pixi.js';
import { TextMetrics } from 'pixi.js';

module.exports = class ClickableComponent extends require('./clickable-component'){
    constructor(u, text, options) {
        super(u, text, options)
        this._style = !!options.style ? new TextStyle(options.style) : new TextStyle(u.FontOptions)
        this._pre_str = text;
        this._post_str = '';

        this._pre_metric = TextMetrics.measureText(this._pre_str,this._style);
        this._full_metric = TextMetrics.measureText(this.value,this._style);
        this._line_height = this._full_metric.lineHeight;
        this._char_width = TextMetrics.measureText(" ",this._style).width;

        this._cursor = this._createContainer(new Rectangle(this._pre_metric.width+options.margin,options.margin,1,this.height-(options.margin*2)), u._default_textures.textbox.focus);
        this._cursor.visible = false;

        if(!this._text) this._text = this._ui.Label(this.value, {
            style: this._style
        }).create(this);

        this._focused = false;

        this._options.click = ()=>{
            if(!this._focused) this.focus();
            if(typeof(options.click)!=='function') options.click(this.value);
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
                } else if(event.key==='ArrowUp'){
                    this._moveCursor('up');
                } else if(event.key==='ArrowDown'){
                    this._moveCursor('down');
                } else if(event.key==='Enter'){
                    this.submit(this.value);
                }
                this._onType();
                event.preventDefault();
            }
        });
    }

    create(parent){
        super.create(parent);
        this.Container.addChild(this._text.Container, this._cursor);
        return this;
    }

    get value(){
        return this._pre_str+this._post_str;
    }

    _onType(updated=false){
        this._pre_metric = TextMetrics.measureText(this._pre_str,this._style);
        this._full_metric = TextMetrics.measureText(this.value,this._style);
    }
    _addText(char){
        this._pre_str+=char;
        this._text.setText(this.value);
    }
    _delText(){
        if(this._pre_str.length>0){
            this._pre_str = this._pre_str.slice(0, -1);
            this._text.setText(this.value);
        }
    }

    _moveCursor(dir){
        if(typeof(dir)==='string'){
            switch(dir){
                case 'left':
                this._cursorBackward(1);
                break;
                case 'right':
                this._cursorForward(1);
                break;
            }
        }
    }

    _cursorForward(ln){
        let substr = this._post_str.substr(0,ln);
        this._post_str = this._post_str.slice(ln);
        this._pre_str = this._pre_str+substr;
    }
    _cursorBackward(ln){
        let substr = this._pre_str.substr(-ln);
        this._pre_str = this._pre_str.substr(0,this._pre_str.length-ln);
        this._post_str = substr+this._post_str;
    }

    focus(){
        this._cursor.visible = true;
        this._focused = true;
    }
    unfocus(){
        this._cursor.visible = false;
        this._focused = false;
    }
}
