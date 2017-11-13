class Button extends require('../ui-component'){
    constructor(u, text='', options={}) {
        super(u);
        
        

        this._text = new PIXI.Text(text, u.FontOptions);
        this._sprite = new PIXI.Sprite();
        this._sprite.x = 100;
        this._sprite.y = 100;
        this._sprite.width = this._bounds.width;
        this._sprite.height = this._bounds.height;
        this._sprite_state = {
            plain: PIXI.Texture.from("data:image/gif;base64,R0lGODlhAQABAPAAAJmZmf///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="),
            hover: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAALu7u////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
            click: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAERERP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        }
        this._sprite.texture = this._sprite_state['plain']


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

        this.setMouseAction(1,"hover",()=>{
            this._sprite.texture = this._sprite_state['hover'];
            console.log('enter');
        }, { bounds: this._bounds, fireOnlyOnceWhileInBounds: true });
        this.setMouseAction(2,"hover",()=>{
            this._sprite.texture = this._sprite_state['plain'];
            console.log('exit')
        }, { bounds: this._bounds, fireOnlyOnceWhileInBounds: true });
    }

    create() {
        super.create();
        this._bounds.addChild(this._text, this._sprite);
        return this;
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Button(...args);
}
