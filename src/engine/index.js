class Engine {
    constructor() {
        this._renderer = require('./renderer')(this);
        this._input = require('./input')(this);
        this._network = require('./network')(this);
        this._manifest = require('./manifest')(this);
        this._toolbox = require('./toolbox')(this);

        this.username_box = this._toolbox.UI.Textbox('Anon', {
            bounds: new PIXI.Rectangle(135, 10, 250, 30)
        });
        this.hostip_box = this._toolbox.UI.Textbox('', {
            bounds: new PIXI.Rectangle(120, 100, 250, 30)
        });

        var modal = this._toolbox.UI.Modal('Network', {
            bounds: new PIXI.Rectangle(200, 100, 400, 500),
            components: [
                this._toolbox.UI.Label('UserName: ', {
                    bounds: new PIXI.Rectangle(10, 10, 0, 0)
                }),
                this.username_box,
                this._toolbox.UI.Button(' Host', {
                    bounds: new PIXI.Rectangle(10, 50, 67, 30),
                    click: ()=>{
                        console.log('Host Game');
                        concosle.log(this._network);
                    }
                }),
                this._toolbox.UI.Label('Game ID:', {
                    bounds: new PIXI.Rectangle(10, 100, 0, 0),
                }),
                this.hostip_box,
                this._toolbox.UI.Button(' Join', {
                    bounds: new PIXI.Rectangle(10, 150, 67, 30),
                    click: ()=>{
                        if(this.hostip_box.value) console.log('Join Game '+this.hostip_box.value);
                    }
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

