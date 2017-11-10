class Engine {
    constructor() {
        this._renderer = require('./renderer')(this);
        this._input = require('./input')(this);
        this._network = require('./network')(this);
        this._manifest = require('./manifest')(this);

        this._loop=()=>{
            requestAnimationFrame(this._loop);
            this._state();
            this._renderer.tick()
        }
        this._states = {
            play: function(){
                this._input.tick();
                this._manifest.tick();
            },
            pause: function(){
                console.log('pause');
            }
        }
        this._state = this._states.play;
    }

    get Manifest() {
        return this._manifest;
    }

    get Renderer() {
        return this._renderer;
    }

    get Input() {
        return this._input;
    }

    get Network() {
        return this._network;
    }

    start(){
        this._renderer.start();
        this._loop();
    }

    stop(){

    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Engine(...args);
}

