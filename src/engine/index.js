class Engine {
    constructor() {
        this._renderer = require('./renderer')(this);
        this._input = require('./input')(this);
        //this._network = require('./network')(this);
        this._manifest = require('./manifest')(this);

        this._toolbox = require('./toolbox')(this);


        var modal = this._toolbox.UI.Modal('Drag Me', {
            bounds: new PIXI.Rectangle(200, 200, 400, 500),
            components: [
                this._toolbox.UI.Label('Label', {
                    bounds: new PIXI.Rectangle(10, 40, 0, 0)
                }),
                this._toolbox.UI.Button('Button', {
                    bounds: new PIXI.Rectangle(10, 80, 300, 30),
                    click: ()=>{
                        console.log('You clicked the button');
                    }
                }),
                this._toolbox.UI.Checkbox('Checkbox', {
                    bounds: new PIXI.Rectangle(10, 130, 30, 30)
                })
            ]
        }).create(null);

        this._loop=()=>{
            requestAnimationFrame(this._loop);
            this._state();
            this._renderer.tick();
        }
        this._states = {
            menu: function() {
                this._input.tick();
                this._toolbox.tick();
            },
            play: function(){
                this._input.tick();
                this._manifest.tick();
            },
            pause: function(){
                console.log('pause');
            }
        }
        this._state = this._states.menu;
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

    get Toolbox() {
        return this._toolbox;
    }

    /*get Network() {
        return this._network;
    }*/

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

