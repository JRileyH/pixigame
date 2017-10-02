module.exports = class Entity {
    constructor(m, texture="noimg", x=0, y=0) {
        this._manifest = m;
        this._sprite = new PIXI.Sprite(
            PIXI.loader.resources[texture].texture
        );
        this._sprite.x = x;
        this._sprite.y = y;
        this._subscribed_actions = {
            press:[],
            release:[],
            during:[]
        }


        this._velocity = {x:0, y:0};
    }

    create(){
        this._manifest.add(this._sprite);
        return this;
    }

    destroy(){
        Engine.Manifest.remove(this._sprite);
    }

    setAction(key, action, event){
        if(this._subscribed_actions[action][key]===undefined){
            let subscription_id = this._manifest._engine.Input.Keyboard.subscribe(key, action, event);
            this._subscribed_actions[action][key] = subscription_id;
        }
    }
    removeAction(key, action){
        let id = this._subscribed_actions[action][key];
        this._manifest._engine.Input.Keyboard.unsubscribe(key, action, id);
        this._subscribed_actions[action][key] = undefined;
    }

    tick(){
        this.slide(this._velocity.x,this._velocity.y);
    }

    //coordinate methods
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

}

//Abstract Class
