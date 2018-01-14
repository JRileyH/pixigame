class Engine {
    constructor() {
        this._renderer = require('./renderer')(this);
        this._input = require('./input')(this);
        this._network = require('./network')(this);
        this._manifest = require('./manifest')(this);
        this._toolbox = require('./toolbox')(this);

        

        this.host_name = this._toolbox.UI.Label('', {
            bounds: new PIXI.Rectangle(10, 10, 0, 0)
        });
        this.host_room = this._toolbox.UI.Label('', {
            bounds: new PIXI.Rectangle(10, 50, 0, 0)
        });

        var host_modal = this._toolbox.UI.Modal('Host', {
            bounds: new PIXI.Rectangle(200, 100, 400, 500),
            components: [
                this.host_name,
                this.host_room
            ]
        });

        this.guest_name = this._toolbox.UI.Label('', {
            bounds: new PIXI.Rectangle(10, 10, 0, 0)
        });
        this.guest_room = this._toolbox.UI.Label('', {
            bounds: new PIXI.Rectangle(10, 50, 0, 0)
        });

        var guest_modal = this._toolbox.UI.Modal('Guest', {
            bounds: new PIXI.Rectangle(200, 100, 400, 500),
            components: [
                this.guest_name,
                this.guest_room
            ]
        });

        Game.Network.socket.on('connect_request', function (data) {
            this.username_box = this._toolbox.UI.Textbox('Anon', {
                bounds: new PIXI.Rectangle(135, 10, 250, 30)
            });
            this.room_box = this._toolbox.UI.Textbox('', {
                bounds: new PIXI.Rectangle(120, 100, 250, 30)
            });
    
            this.whodis_modal = this._toolbox.UI.Modal('Network', {
                bounds: new PIXI.Rectangle(200, 100, 400, 500),
                components: [
                    this._toolbox.UI.Label('UserName: ', {
                        bounds: new PIXI.Rectangle(10, 10, 0, 0)
                    }),
                    this.username_box,
                    this._toolbox.UI.Button(' Host', {
                        bounds: new PIXI.Rectangle(10, 50, 67, 30),
                        click: ()=>{
                            Game.Network.socket.emit('host', {
                                cid: Cookies.get('cid') || null,
                                sid: Game.Network.socket.id,          
                                username: this.username_box.value,
                                role: 'host'
                            });
                        }
                    }),
                    this._toolbox.UI.Label('Room:', {
                        bounds: new PIXI.Rectangle(10, 100, 0, 0),
                    }),
                    this.room_box,
                    this._toolbox.UI.Button(' Join', {
                        bounds: new PIXI.Rectangle(10, 150, 67, 30),
                        click: ()=>{
                            Game.Network.socket.emit('join', {
                                cid: Cookies.get('cid') || null,
                                sid: Game.Network.socket.id,
                                rid: this.room_box.value.toUpperCase(),
                                username: this.username_box.value,
                                role: 'guest'
                            });
                        }
                    })
                ]
            }).create(null);
            console.log(data);
        });
        Game.Network.socket.on('connect_host', function (data) {
            host_modal.create(null);
            console.log(data);
        });
        Game.Network.socket.on('connect_guest', function (data) {
            guest_modal.create(null);
            console.log(data);
        });

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

