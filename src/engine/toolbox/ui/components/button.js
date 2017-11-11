class Button extends require('../ui-component'){
    constructor(u) {
        super(u);

        this._bounds = {
            x: this._sprite.x,
            y: this._sprite.y,
            w: this._sprite.width,
            h: this._sprite.height
        }

        this._sprite_state = {
            plain: this._sprite.texture,
            hover: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP8REf///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
            click: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAABH/Ef///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        }

        this.setKeyAction(13,"press",()=>{
            this._sprite.texture = this._sprite_state['click'];
        });
        this.setKeyAction(13,"release",()=>{
            this._sprite.texture = this._sprite_state['plain'];
        });

        this.setMouseAction(0,"press",()=>{
            this._sprite.texture = this._sprite_state['click'];
        }, this._bounds);
        this.setMouseAction(0,"release",()=>{
            this._sprite.texture = this._sprite_state['plain'];
        }, this._bounds);

        this.setMouseAction(0,"hover",()=>{
            this._sprite.texture = this._sprite_state['hover'];
        }, this._bounds);
        this.setMouseAction(1,"hover",()=>{
            this._sprite.texture = this._sprite_state['plain'];
            console.log('power')
        }, this._bounds);
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Button(...args);
}
