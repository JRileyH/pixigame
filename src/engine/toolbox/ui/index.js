class UI {
    constructor(e) {
        this._engine = e;
        this._components = [];
        this._font_options = {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'};
    }
    
    get FontOptions() {
        return this._font_options;
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

    add(component){
        let id = this._components.push(component)-1;
        component._id = id;
        this._engine._renderer._stage.addChild(component.Bounds);
    }

    remove(component){
        this._components[component._id] = undefined;
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

