class Manifest {
    constructor(e) {
        this._engine = e;
        this._player = require('./player')(this, 'knight', 500, 650, 'run').create();
        this._enemeies = [];
    }

    tick() {
        this._player.tick();
        for(let e of this._enemeies){
            e.tick();
        }
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
    return new Manifest(...args);
}

