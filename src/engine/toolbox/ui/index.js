class UI {
    constructor(e) {
        this._engine = e;
    }
    
    TextBox(...args){
        let p = require('./components/textbox')
        return new p(this, ...args);
    }

    Modal(...args){
        let p = require('./components/modal');
        return new p(this, ...args);
    }

    Button(...args){
        let p = require('./components/button');
        return new p(this, ...args);
    }

    add(sprite){
        this._engine._renderer._stage.addChild(sprite);
    }

    remove(sprite){
        this._engine._renderer._stage.removeChild(sprite);
    }
    
}

module.exports = (...args)=>{
    //do arguements control here
    return new UI(...args);
}

