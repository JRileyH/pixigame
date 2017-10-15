module.exports = class Spine {
    constructor(m, texture="noimg", animation_data={speed:0.03,frames:23}) {
        this._manifest = m;
        this._animation_state = 'idle';
        //frames in cycle is equal 30 Spine frames at animation speed
        //exact convertion to come.
        //---Speed---|---Cycle---\\
        //   0.01    |    98     \\
        //   0.02    |    48     \\
        //   0.03    |    32     \\
        //   0.04    |    23     \\
        this._animation_speed = animation_data.speed;
        this._frames_in_cycle = animation_data.frames;

        let res = PIXI.loader.resources;
        if(res[texture]===undefined){
            throw { type: 'MissingResourceException', message: '['+texture+'] resource has not been loaded.'}
        }
        if(res[texture].extension!=='json'){
            throw { type: 'WrongResourceException', message: '['+texture+'] resource must be JSON spine data. Found '+res[texture].extension}
        }
        this._sprite = new PIXI.spine.Spine(res[texture].spineData);

        this._sprite.skeleton.setToSetupPose();
        this._sprite.update(0);
        this._sprite.autoUpdate = false;
        this._sprite.state.setAnimation(0, 'idle', true);
        this._sprite.x = 0;
        this._sprite.y = 0;

        this._subscribed_actions = {
            press:[],
            release:[],
            during:[]
        }
        this._delay = {
            active: false,
            count: 0,
            until: 0,
            after: ()=>{},
        }
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

    delay(frames, cb){
        this._delay.active = true;
        this._delay.count = 0;
        this._delay.until = frames;
        this._delay.after = cb;
    }

    setState(state){
        this._sprite.state.setAnimation(0, state, true);
        this._animation_state=state;
    }
    
    tick(){
        if(this._delay.active){
            if(this._delay.until<this._delay.count++){
                this._delay.after();
                this._delay.active = false;
            }
        }
        this._sprite.update(this._animation_speed);
    }
}

//Abstract Class
