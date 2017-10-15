class Manifest {
    constructor(e) {
        this._engine = e;
        //this._floor = require('./floor')(this, 'floor', 0, 585).create();
        //this._player = require('./player')(this, 'knight', 500, 650).create();
        this._dialogue = require('./dialogue')(this, 'knight', 'talk1').create();
        this._enemeies = [];
    }

    tick() {
        //this._floor.tick();
        //this._player.tick();
        this._dialogue.tick();
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

