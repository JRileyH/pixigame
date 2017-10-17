class Dialog extends require('./spine'){
    constructor(m, texture="noimg", script, box_texture='dialog_box', margins={x:40,y:20}){
        super(m, texture);
        //TODO: figure out how to resolve this properly
        this._script = require('../../../res/dialogs/'+script+'.json');
        this._convo_index = 0;
        this._convo = this._script[this._convo_index];
        this._dialog_box = new PIXI.Container();
        this._dialog_box_bounds = {
            x: Math.floor(Game.Window.width*0.1),
            y: Math.floor(Game.Window.height*0.7),
            w: Math.floor(Game.Window.width*0.6),
            h: Math.floor(Game.Window.height*0.2)
        }

        this._dialog_box.x = this._dialog_box_bounds.x;
        this._dialog_box.y = this._dialog_box_bounds.y;
        this._dialog_box.width = this._dialog_box_bounds.w;
        this._dialog_box.height = this._dialog_box_bounds.h;
        
        this._manifest.add(this._dialog_box);

        this._dialog_box_texture = new PIXI.Sprite(
            PIXI.loader.resources[box_texture].texture
        );
        this._dialog_box_texture.x = -margins.x;
        this._dialog_box_texture.y = -margins.y;
        this._dialog_box_texture.width = this._dialog_box_bounds.w+margins.x*2;
        this._dialog_box_texture.height = this._dialog_box_bounds.h+margins.y*2;
        this._dialog_box.addChild(this._dialog_box_texture);

        

        this._dialog_box_text_style = new PIXI.TextStyle({
            wordWrap: true,
            wordWrapWidth: this._dialog_box_bounds.w,
        });
        this._dialog_box_text = new PIXI.Text(this._convo.text, this._dialog_box_text_style);

        this._dialog_box_mask = this.mask(this._dialog_box_bounds);
        this._manifest.add(this._dialog_box_mask);
        this._dialog_box_text.mask = this._dialog_box_mask;

        this._dialog_box.addChild(this._dialog_box_text);

        this._sprite.x = 800;
        this._sprite.y = 500;

        this.setKeyAction(13,"press",()=>{
            if(this._convo.options[0]!==null){
                this.next(0);
            }
        });
        
        this.setResponseListeners();

        this.scrollUp = e=> {
            this._dialog_box_text.y+=5;
            if(this._dialog_box_text.y>0)this._dialog_box_text.y=0;
        }
    
        this.scrollDown = e=> {
            let max = this._dialog_box_bounds.h-this._dialog_box_text.height;
            this._dialog_box_text.y-=5;
            if(this._dialog_box_text.y<=max)this._dialog_box_text.y=max;
        }
    }

    tick(){
        super.tick();
    }

    

    setResponseListeners(){
        for(let i = 1; i <=9; i++){
            if(this._convo.options[i]!==undefined){
                this.setKeyAction(48+i,"press",()=>{
                    this.next(i);
                });
            } else {
                this.removeKeyAction(48+i, "press");
            }
        }
    }

    next(option){
        this._dialog_box_text.y=0;
        this._convo_index = this._convo.options[option].index;
        this._convo = this._script[this._convo_index];
        
        if(this._convo.preaction!==null){
            this.setState(this._convo.preaction.emote);
            this.delay(this._frames_in_cycle*this._convo.preaction.length, ()=>{
                this.setState(this._convo.emotion);
            })
        } else {
            this.setState(this._convo.emotion);
        }
        this._dialog_box_text.text = this._convo.text;
        for(let i = 1; this._convo.options[i]!==undefined; i++){
            this._dialog_box_text.text += '\n'+i+". "+this._convo.options[i].response;
        }
        if(this._dialog_box.height<this._dialog_box_text.height){
            this.setMouseAction(3, "scroll", this.scrollUp);
            this.setMouseAction(4, "scroll", this.scrollDown);
            this.setKeyAction(38, "during", this.scrollUp);
            this.setKeyAction(40, "during", this.scrollDown);

        } else {
            this.removeMouseAction(3, "scroll");
            this.removeMouseAction(4, "scroll");
            this.removeKeyAction(38, "during");
            this.removeKeyAction(40, "during");
        }

        this.setResponseListeners();
    }

    mask(bounds){
        let mask = new PIXI.Graphics();
        mask.beginFill();

        // draw a shape
        mask.moveTo(bounds.x, bounds.y);
        mask.lineTo(bounds.x+bounds.w, bounds.y);
        mask.lineTo(bounds.x+bounds.w, bounds.y+bounds.h);
        mask.lineTo(bounds.x, bounds.y+bounds.h);
        mask.lineTo(bounds.x, bounds.y);

        mask.endFill();
    
        return mask;
    }

}

module.exports = (...args)=>{
    //do arguements control here
    return new Dialog(...args);
}