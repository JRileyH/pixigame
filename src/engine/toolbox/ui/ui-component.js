module.exports = class UiComponent {
    constructor(u, options) {
        this._ui = u;
        this._options = options;
        this._disabled = false;
        this._container = this._createContainer(options.bounds);

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
    
    get Container(){
        return this._container;
    }
    
    _createContainer(rect, texture){
        let container;
        if(texture===undefined){
            container = new PIXI.Container();
        } else {
            container = new PIXI.Sprite();
            container.texture = texture;
        }
        container.x = !!rect?rect.x||0:0;
        container.y = !!rect?rect.y||0:0;
        container.width = !!rect?rect.width||0:0;
        container.height = !!rect?rect.height||0:0;
        return container;
    }

    create(parent){
        this._parent = parent;
        this._ui.add(this);
        return this;
    }

    enable(){
        if(this._disabled) this._disabled = false;
    }

    disable(){
        if(!this._disabled) this._disabled = true;
    }

    destroy(){
        this._ui.remove(this);
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

    get x(){
        return this._container.x;
    }
    get y(){
        return this._container.y;
    }
    get width(){
        return this._container._width;
    }
    get height(){
        return this._container._height;
    }
    move(x,y){
        this._container.x = x;
        this._container.y = y;
    }
    slide(x,y){
        this._container.x += x;
        this._container.y += y;
    }
    resize(w,h){
        this._container._width = w;
        this._container._height = h;
    }
    scale(w,h){
        this._container._width += w;
        this._container._height += h;
    }

    tick(){
        
    }
}
