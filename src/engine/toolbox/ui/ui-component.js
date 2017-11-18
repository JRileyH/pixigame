module.exports = class UiComponent {
    constructor(u, options) {
        this._ui = u;
        this._options = options;
        this._bounds = new PIXI.Container();
        this._bounds.x = options.x||!!options.bounds?options.bounds.x||0:0;
        this._bounds.y = options.y||!!options.bounds?options.bounds.y||0:0;
        this._bounds.width = options.width||!!options.bounds?options.bounds.width||0:0;
        this._bounds.height = options.height||!!options.bounds?options.bounds.height||0:0;

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

    get Bounds(){
        return this._bounds
    }
    
    create(){
        this._ui.add(this);
        return this;
    }

    destroy(){
        this._ui.remove(this._bounds);
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

    setMouseAction(button, action, event, options){
        if(this._subscribed_mouse_actions[action][button]===undefined){
            let subscription_id = this._ui._engine.Input.Mouse.subscribe(button, action, event, options);
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
