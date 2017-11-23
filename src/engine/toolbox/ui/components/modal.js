class Modal extends require('../ui-component'){
    constructor(u, text='', options={}) {
        options.margin = options.margin || 30;
        if(options.texture === undefined) options.texture = {};
        if(options.texture.dragbar === undefined) options.texture.dragbar = {};
        if(options.texture.closebutton === undefined) options.texture.closebutton = {};
        if(options.texture.minbutton === undefined) options.texture.minbutton = {};
        super(u, options);
        
        this._background = this._createContainer(new PIXI.Rectangle(0, options.margin, this.width, this.height-options.margin), (options.background || this._ui._default_textures.modal.background));
        
        if(!Array.isArray(this._options.components)) { this._components = [];} else { this._components = this._options.components.slice()}

        this._dragbar = this._ui.Button(text,{
            bounds: new PIXI.Rectangle(0, 0, this.width-(options.margin*2), options.margin),
            texture: {
                background: {
                    plain: options.texture.dragbar.plain || this._ui._default_textures.modal.dragbar.plain,
                    hover: options.texture.dragbar.hover || this._ui._default_textures.modal.dragbar.hover,
                    click: options.texture.dragbar.click || this._ui._default_textures.modal.dragbar.click
                }
            },
        }).create(this);

        this._closebutton = this._ui.Button(' X',{
            bounds: new PIXI.Rectangle(this.width-options.margin, 0, options.margin, options.margin),
            texture: {
                background: {
                    plain: options.texture.closebutton.plain || this._ui._default_textures.modal.closebutton.plain,
                    hover: options.texture.closebutton.hover || this._ui._default_textures.modal.closebutton.hover,
                    click: options.texture.closebutton.click || this._ui._default_textures.modal.closebutton.click
                }
            },
            click: ()=>{
                this.close();
            }
        }).create(this);

        this._collapsed = false;
        this._minbutton = this._ui.Button(' --',{
            bounds: new PIXI.Rectangle(thiswidth-(options.margin*2), 0, options.margin, options.margin),
            texture: {
                background: {
                    plain: options.texture.minbutton.plain || this._ui._default_textures.modal.minbutton.plain,
                    hover: options.texture.minbutton.hover || this._ui._default_textures.modal.minbutton.hover,
                    click: options.texture.minbutton.click || this._ui._default_textures.modal.minbutton.click
                }
            },
            click: ()=>{
                if(this._collapsed){
                    this.expand();
                } else {
                    this.collapse();
                }
            }
        }).create(this);

        this.setMouseAction(0,"press",data=>{
            this._dragging=true;
            this._offset = {
                x: data.x-this.Container.getGlobalPosition().x,
                y: data.y-this.Container.getGlobalPosition().y
            }
        }, { bounds: this._dragbar.Container });

        this.setMouseAction(0,"release",data=>{
            this._dragging=false;
            if(this.x<0)this.x=0;
            if(this.y<0)this.y=0;
            if(this.x+this.Container.width>Game.Window.width)this.x=Game.Window.width-this.Container.width;
            if(this.y+30>Game.Window.height)this.y=Game.Window.height-30;
            
        });

        this.setMouseAction(0,"during",data=>{
            if(this._dragging){
                this.x = data.x-this._offset.x
                this.y = data.y-this._offset.y
            }
        });

    }
    create(parent) {
        super.create(parent);
        this.Container.addChild(this._background, this._dragbar.Container, this._closebutton.Container, this._minbutton.Container);
        for(let component of this._components){
            component.Container.y += this._options.margin
            this.Container.addChild(component.create(this).Container)
        }
        return this;
    }

    close(){
        this.destroy();
    }
    collapse(){
        if(!this._collapsed){
            this._background.visible = false;
            for(let component of this._components){
                component.Container.visible = false;
                component.disable();
            }
            this._collapsed=true;
        }
    }
    expand(){
        if(this._collapsed){
            this._background.visible = true;
            for(let component of this._components){
                component.Container.visible = true;
                component.enable();
            }
            this._collapsed=false;
        }
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Modal(...args);
}