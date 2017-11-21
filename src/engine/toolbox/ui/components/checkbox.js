class Checkbox extends require('../clickable-component'){
    constructor(u, text='', options={}) {
        options.component_type = 'checkbox';
        super(u, text, options);

        this._text.Bounds.x = this._bounds._width+10;

        this._checked = false;

        this._mark = this._createContainer(new PIXI.Rectangle(5, 5, this._bounds._width-10, this._bounds._height-10), options.texture.mark || u._default_textures.checkbox.mark)
        this._mark.visible = false;

        this._options.click = ()=>{
            if(this._checked){
                this.uncheck();
            } else {
                this.check();
            }
            if(typeof(options.click)!=='function') options.click(this._checked);
        }
    }

    create(parent){
        super.create(parent);
        this._bounds.addChild(this._mark);
        return this;
    }

    check(){
        this._mark.visible = true;
        this._checked = true;
    }
    uncheck(){
        this._mark.visible = false;
        this._checked = false;
    }

    get value(){
        return this._checked;
    }

}

module.exports = (...args)=>{
    //do arguements control here
    return new Checkbox(...args);
}
