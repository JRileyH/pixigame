class Input {
    constructor(e) {
        this._engine = e;
        this._keyboard = require('./keyboard')();
    }
    get Keyboard(){
        return this._keyboard;
    }

    tick(){
        this._keyboard.tick();
    }

}

module.exports = (...args)=>{
    //do arguements control here
    return new Input(...args);
}

