require('pixi.js')
require('./loader')(setup, progress);

function progress(loader, resource){
    console.log('Loading '+loader.progress+"%: "+resource.url);
}

function setup(){
    global.Engine = require('./engine')();
    Engine.start();
}
