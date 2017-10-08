require('pixi.js');
require('pixi-spine');

require('./loader')(setup, progress);

function progress(loader, resource){
    console.log('Loading '+loader.progress+"%: "+resource.url);
}

function setup(loader, res){
    global.Engine = require('./engine')();
    Engine.start();
}
