require('pixi.js');
require('pixi-spine');
window.Cookies = require('cookies-js');
window.Game = require('./game-constants');
//Cookies.set('cid', 'jhgasdfhbfh1');
Game.Network.socket = require('socket.io-client').connect(Game.Network.protocol+'://'+Game.Network.host+':'+Game.Network.port, { query: "cid="+Cookies.get('cid') });
require('./loader')(setup, progress);

function progress(loader, resource){
    document.querySelector('#'+Game.Window.loader+' > ul').innerHTML += '<li>'+loader.progress+"%: "+resource.url+'</li>';
}

function setup(loader, res){
    document.getElementById(Game.Window.loader).style.display = 'none';
    Game.Engine = require('./engine')();
    Game.Engine.start();
}
