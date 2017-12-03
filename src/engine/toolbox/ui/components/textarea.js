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
        if(this._num_of_lines != this._full_metric.lineWidths.length){
            this._num_of_lines = this._full_metric.lineWidths.length;
            this.resize(this.width, this._num_of_lines * this._full_metric.lineHeight)
        }
        this._current_line = this._pre_metric.lineWidths.length-1;
        this._cursor.x = this._pre_metric.lineWidths[this._current_line]+this._options.margin
        this._cursor.y = (this._pre_metric.lineHeight*this._current_line)+this._options.margin;
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
