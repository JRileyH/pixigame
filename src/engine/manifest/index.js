class Manifest {
    constructor(e) {
        this._engine = e;
        this._player = require('./player')(this, 'blob', 30, 30).create();
        this._player2 = require('./player')(this, 'alien', 500, 700, true).create();
        this._enemeies = [];
    }

    tick() {
        this._player.tick();
        this._player2.tick();
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

