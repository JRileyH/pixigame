class UI {
    constructor(e) {
        this._engine = e;
        this._components = [];
        this._font_options = {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'};
        this._default_textures = {
            modal: {
                background: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAMzMzP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                dragbar:{
                    plain: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAJmZ3f///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                    hover: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAALu7/////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                    click: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAHd3u////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
                },
                minbutton:{
                    plain: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP+IAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                    hover: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP+qIv///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                    click: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAMx3AP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
                },
                closebutton:{
                    plain: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP9mZv///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                    hover: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP+IiP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                    click: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP9ERP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
                }
            },
            button: {
                background:{
                    plain: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAJmZmf///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                    hover: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAALu7u////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                    click: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAERERP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
                }
            },
            checkbox: {
                background:{
                    plain: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAO7umf///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                    hover: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAP//u////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='),
                    click: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAN3dd////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
                },
                mark: PIXI.Texture.from('data:image/gif;base64,R0lGODlhAQABAPAAAMzMVf///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
            }
        }
    }
    
    get FontOptions() {
        return this._font_options;
    }

    Label(...args){
        let p = require('./components/label')
        return new p(this, ...args);
    }

    TextBox(...args){
        let p = require('./components/textbox')
        return new p(this, ...args);
    }

    Modal(...args){
        let p = require('./components/modal');
        return new p(this, ...args);
    }

    Button(...args){
        let p = require('./components/button');
        return new p(this, ...args);
    }

    Checkbox(...args){
        let p = require('./components/checkbox');
        return new p(this, ...args);
    }

    add(component){
        let id = this._components.push(component)-1;
        component._id = id;
        this._engine._renderer._stage.addChild(component.Bounds);
    }

    remove(component){
        console.log(component);
        //this._components[component._id] = undefined;
        this._engine._renderer._stage.removeChild(component.Bounds);
    }

    tick(){
        for(let component of this._components){
            component.tick();
        }
    }
    
}

module.exports = (...args)=>{
    //do arguements control here
    return new UI(...args);
}

