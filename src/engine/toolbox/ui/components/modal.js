class Modal extends require('../ui-component'){
    constructor(u, text='', options={}) {
        super(u, options);
        this._background = new PIXI.Sprite();
        this._background.x = 0;
        this._background.y = 0;
        this._background.width = this._bounds._width;
        this._background.height = this._bounds._height;
        this._background.texture = !!options.background ? options.background : PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAMzMzP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==');

        if(!Array.isArray(this._options.components)) this._options.components = [];

        this._dragbar = this._ui.Button(text,{
            bounds: new PIXI.Rectangle(0, 0, this._bounds._width-30, 30),
            texture: {
                plain: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP+IAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                hover: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP+qIv///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                click: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAMx3AP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
            },
        }).create(this);
        this._closebutton = this._ui.Button('X',{
            bounds: new PIXI.Rectangle(this._bounds._width-30, 0, 30, 30),
            texture: {
                plain: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP9mZv///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                hover: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP+IiP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                click: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP9ERP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
            },
            click: ()=>{
                this.destroy();
            }
        }).create(this);

        this.setMouseAction(0,"press",data=>{
            this._dragging=true;
            this._offset = {
                x: data.x-this._bounds.getGlobalPosition().x,
                y: data.y-this._bounds.getGlobalPosition().y
            }
        }, { bounds: this._dragbar.Bounds });

        this.setMouseAction(0,"release",data=>{
            this._dragging=false;
            if(this._bounds.x<0)this._bounds.x=0;
            if(this._bounds.y<0)this._bounds.y=0;
            if(this._bounds.x+this._bounds.width>Game.Window.width)this._bounds.x=Game.Window.width-this._bounds.width;
            if(this._bounds.y+30>Game.Window.height)this._bounds.y=Game.Window.height-30;
            
        });

        this.setMouseAction(0,"during",data=>{
            if(this._dragging){
                this._bounds.x = data.x-this._offset.x
                this._bounds.y = data.y-this._offset.y
            }
        });

    }
    create(parent) {
        super.create(parent);
        this._bounds.addChild(this._background, this._dragbar.Bounds, this._closebutton.Bounds);
        for(let component of this._options.components){
            this._bounds.addChild(component.create(this).Bounds)
        }
        return this;
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Modal(...args);
}