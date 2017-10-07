require('pixi.js');
require('pixi-spine');


/*var app = new PIXI.Application();
document.body.appendChild(app.view);

app.stop();

// load spine data
PIXI.loader
    .add('alien', 'res/skeletons/alien.json')
    .load(onAssetsLoaded);

var alien = null;

function onAssetsLoaded(loader,res)
{
    // instantiate the spine animation
    alien = new PIXI.spine.Spine(res.alien.spineData);
    alien.skeleton.setToSetupPose();
    alien.update(0);
    alien.autoUpdate = false;

    // create a container for the spine animation and add the animation to it
    var alienCage = new PIXI.Container();
    alienCage.addChild(alien);

    // measure the spine animation and position it inside its container to align it to the origin
    var localRect = alien.getLocalBounds();
    alien.position.set(-localRect.x, -localRect.y);

    // now we can scale, position and rotate the container as any other display object
    var scale = Math.min(
        (app.renderer.width * 0.7) / alienCage.width, 
        (app.renderer.height * 0.7) / alienCage.height
    );
    alienCage.scale.set(scale, scale);
    alienCage.position.set(
        (app.renderer.width - alienCage.width) * 0.5,
        (app.renderer.height - alienCage.height) * 0.5
    );

    // add the container to the stage
    app.stage.addChild(alienCage);

    // once position and scaled, set the animation to play
    alien.state.setAnimation(0, 'walk', true);

    app.start();
}

app.ticker.add(function() {
    // update the spine animation, only needed if alien.autoupdate is set to false
    alien.update(0.01666666666667); // HARDCODED FRAMERATE!
});*/

require('./loader')(setup, progress);

function progress(loader, resource){
    console.log('Loading '+loader.progress+"%: "+resource.url);
}

function setup(loader, res){
    global.Engine = require('./engine')();
    Engine.start();
}
