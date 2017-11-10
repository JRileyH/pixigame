class Blip {
    constructor(m) {
        this._manifest = m;
        this._sprite = PIXI.Sprite.from("data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==");
        this._sprite.x = 100;
        this._sprite.y = 100;
        this._sprite.width = 10;
        this._sprite.height = 10;
        this._velocity = {x:0,y:0};

        this._network = m._engine._network

        this._subscribed_key_actions = {
            press:[],
            release:[],
            during:[]
        }
        this._subscribed_mouse_actions = {
            press:[],
            release:[],
            during:[],
            scroll:[]
        }
        this._subscribed_packet_actions = [];
    }

    create(){
        this._manifest.add(this._sprite);
        
        this._network.packet('creation').send('others', {x: this.x, y: this.y})

        this.setPacketAction('movement', event=>{
            console.log(event);
        });

        //up
        this.setKeyAction(38, "press", ()=>{
            this._network.packet('movement').send('all', {action: 'start', direction: 'up'})
        });
        this.setKeyAction(38, "release", ()=>{
            this._network.packet('movement').send('all', {action: 'stop', direction: 'up'});
        });
        //right
        this.setKeyAction(39, "press", ()=>{
            this._network.packet('movement').send('all', {action: 'start', direction: 'right'});
        });
        this.setKeyAction(39, "release", ()=>{
            this._network.packet('movement').send('all', {action: 'stop', direction: 'right'});
        });
        //up
        this.setKeyAction(40, "press", ()=>{
            this._network.packet('movement').send('all', {action: 'start', direction: 'down'});
        });
        this.setKeyAction(40, "release", ()=>{
            this._network.packet('movement').send('all', {action: 'stop', direction: 'down'});
        });
        //up
        this.setKeyAction(37, "press", ()=>{
            this._network.packet('movement').send('all', {action: 'start', direction: 'left'});
        });
        this.setKeyAction(37, "release", ()=>{
            this._network.packet('movement').send('all', {action: 'stop', direction: 'left'});
        });
        return this;
    }

    destroy(){
        Engine.Manifest.remove(this._sprite);
    }

    setKeyAction(key, action, event){
        if(this._subscribed_key_actions[action][key]===undefined){
            let subscription_id = this._manifest._engine.Input.Keyboard.subscribe(key, action, event);
            this._subscribed_key_actions[action][key] = subscription_id;
        }
    }
    removeKeyAction(key, action){
        let id = this._subscribed_key_actions[action][key];
        this._manifest._engine.Input.Keyboard.unsubscribe(key, action, id);
        this._subscribed_key_actions[action][key] = undefined;
    }

    setMouseAction(button, action, event){
        if(this._subscribed_mouse_actions[action][button]===undefined){
            let subscription_id = this._manifest._engine.Input.Mouse.subscribe(button, action, event);
            this._subscribed_mouse_actions[action][button] = subscription_id;
        }
    }
    removeMouseAction(button, action){
        let id = this._subscribed_mouse_actions[action][button];
        this._manifest._engine.Input.Mouse.unsubscribe(button, action, id);
        this._subscribed_mouse_actions[action][button] = undefined;
    }

    setPacketAction(packet, event){
        if(this._subscribed_packet_actions[packet]===undefined){
            let subscription_id = this._manifest._engine._network.packet(packet).subscribe(event);
            this._subscribed_packet_actions[packet] = subscription_id;
        }
    }
    removePacketAction(packet){
        let id = this._subscribed_packet_actions[packet];
        this._manifest._engine._network.packet(packet).unsubscribe(id);
        this._subscribed_packet_actions[packet] = undefined;
    }
    
    get x(){
        return this._sprite.x;
    }
    get y(){
        return this._sprite.y;
    }
    move(x, y){
        this._sprite.position.set(x, y)
        return this._sprite.position;
    }
    slide(x, y){
        this._sprite.x += x;
        this._sprite.y += y;
        return this._sprite.position;
    }

    tick(){
       this.slide(this._velocity.x, this._velocity.y);
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Blip(...args);
}
