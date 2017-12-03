import { Rectangle } from 'pixi.js';
import { TextStyle } from 'pixi.js';
import { TextMetrics } from 'pixi.js';

class Textarea extends require('../typable-component'){
    constructor(u, text='', options={}) {
        if(options.margin===undefined)options.margin=2;
        options.style = !!options.style ? options.style : u.FontOptions
        options.style.wordWrap = true;
        options.style.wordWrapWidth = options.bounds.width;
        options.component_type = 'textbox';
        super(u, text, options);
        this._onType();
    }

    _onType(){
        super._onType();
        if(this._num_of_lines != this._full_metric.lines.length){
            this._num_of_lines = this._full_metric.lines.length;
            this.resize(this.width, this._num_of_lines * this._line_height)
        }
        this._current_line = this._pre_metric.lines.length-1;

        this._cursor.x = this._pre_metric.lineWidths[this._current_line];
        this._cursor.y = (this._line_height*this._current_line)+this._options.margin;
        if(this._cursor.x+this._char_width>this.width && this._current_line+1!==this._num_of_lines){
            this._cursor.x = 0;
            this._cursor.y += this._line_height;
        }
    }

    _moveCursor(dir){
        super._moveCursor(dir)
        if(typeof(dir)==='string'){
            switch(dir){
                case 'up':
                if(this._current_line > 0){
                    this._cursorBackward(this._full_metric.lines[--this._current_line].length+1);
                }
                break;
                case 'down':
                if(this._current_line+1 < this._num_of_lines){
                    this._cursorForward(this._full_metric.lines[this._current_line].length+1);
                }
                break;
            }
        }
    }

}

module.exports = (...args)=>{
    //do arguements control here
    return new Textarea(...args);
}
