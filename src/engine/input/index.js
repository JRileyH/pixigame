class Input {
    constructor(e) {
        this._engine = e;
        this._keyboard = require('./keyboard')();
        this._mouse = require('./mouse')();
    }
    get Keyboard(){
        return this._keyboard;
    }
    get Mouse(){
        return this._mouse;
    }
    tick(){
        this._keyboard.tick();
        this._mouse.tick();
    }

}

module.exports = (...args)=>{
    //do arguements control here
    return new Input(...args);
}

