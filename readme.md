# PixiGame
PixiGame is a set of tools that can be used to create browser games.
It consumes [http://www.pixijs.com/](Pixi.js) as a rendering engine and
[https://socket.io/](Socket.io) / [https://github.com/Sleepy-Fish/pixigame-server](PixiGame-Server) for networking and multiplayer features. As development continues, I'll mainly be using this repo as a demo environment for new features as they are added.

***

### Tools Included
* Input Subscriber
* Dialog Script Reader

### Tools on the way
* Websocket Sessions

***

## Start Developing
This project is entirely open and pull requests and issue suggestions are welcome!
```console
$ git clone https://github.com/Sleepy-Fish/pixigame.git
$ npm install
$ npm install -g webpack
$ webpack --watch
*** IN 2nd TERMINAL ***
$ http-server
```
***

# Input Subcriber
The Input Subscriber is intented to remove the hassle of utilizing keyboard and mouse input for browser games. It abstracts event listeners and allows you to simply subscribe a callback function to a keyboard or mouse event and processes all events within a single class instance instead of having to write logic in every entities' update loops.
#### Usage
```javascript
/* Create and instance of Input put class in your Engine Class and add its tick() function to loop */
class Engine {
    constructor() {
        this._input = require('./input')(this);

        this._loop=()=>{
            requestAnimationFrame(this._loop);
            this._state();
        }
        this._states = {
            play: function(){
                this._input.tick();
            }
        }
        this._state = this._states.play;
    }
}
```
```javascript
/* In any other game class you can now subscribe to an input event */
var subscription_id = Input.Keyboard.subscribe(32, "press", ()=>{ // 32 is Space key code, "press" is keydown event
  //Do Something
});

/* Use the returned integer value to then unsubscribe from that event */
Input.Keyboard.unsubscribe(32, "press", subscription_id); //Use the same key code and event name to unsubscribe
```
Keyboard Parameters are:
1. `Integer` [http://www.keycode.info/](Key Code),
2. `String` <`"press"`, `"release"`, or `"during"`>,
3. `function` callback

Mouse Parameters are:
1. `Integer` Button Value / Scroll Direction
2. `String` <`"press"`, `"release"`, `"during"`, or `"scroll"`>
3. `function` callback

In the case of using the `"scroll"` action, the 1st param represents a direction of scroll.
```json
{
  "0": "any direction",
  "1": "scroll left",
  "2": "scroll right",
  "3": "scroll up",
  "4": "scroll down"
}
```

# Dialog Script Reader
The Dialog Script Reader is intended to abstract the task of creating text based interactions that you may have with an NPC out of the code and into a relatively simple JSON format. It handles Dialog from NPCs, Response options for the player, Alternate Spine idle animations per dialog frame, and a preaction animation upon beginning a dialog frame.
#### Usage

