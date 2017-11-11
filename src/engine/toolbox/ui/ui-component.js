module.exports = class UiComponent {
    constructor(u) {
        this._ui = u;
        this._sprite = PIXI.Sprite.from("data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==");
        this._sprite.x = 100;
        this._sprite.y = 100;
        this._sprite.width = 300;
        this._sprite.height = 30;

        this._subscribed_key_actions = {
            press:[],
            release:[],
            during:[]
        }
        this._subscribed_mouse_actions = {
            press:[],
            release:[],
            during:[],
            hover:[],
            scroll:[]
        }
    }
    create(){
        this._ui.add(this._sprite);
        return this;
    }

    destroy(){
        this._ui.remove(this._sprite);
    }

    setKeyAction(key, action, event){
        if(this._subscribed_key_actions[action][key]===undefined){
            let subscription_id = this._ui._engine.Input.Keyboard.subscribe(key, action, event);
            this._subscribed_key_actions[action][key] = subscription_id;
        }
    }
    removeKeyAction(key, action){
        let id = this._subscribed_key_actions[action][key];
        this._ui._engine.Input.Keyboard.unsubscribe(key, action, id);
        this._subscribed_key_actions[action][key] = undefined;
    }

    setMouseAction(button, action, event, bounds){
        if(this._subscribed_mouse_actions[action][button]===undefined){
            let subscription_id = this._ui._engine.Input.Mouse.subscribe(button, action, event, bounds);
            this._subscribed_mouse_actions[action][button] = subscription_id;
        }
    }
    removeMouseAction(button, action){
        let id = this._subscribed_mouse_actions[action][button];
        this._ui._engine.Input.Mouse.unsubscribe(button, action, id);
        this._subscribed_mouse_actions[action][button] = undefined;
    }

    tick(){
        
    }
}
