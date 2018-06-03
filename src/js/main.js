'use strict';
import CanvasEnvironment from './modules/CanvasEnvironment.js';
import Point from './modules/Point.js';
import Environment from './modules/Environment.js';
import Player from './modules/Player.js';
import Ghost from './modules/Ghost.js';
import Game from './modules/Game.js';

var background = 'black';
var unit = 20;
var marginVertical = (window.innerHeight - Math.floor(window.innerHeight / unit) * unit) / 2;
var marginHorizontal = (window.innerWidth - Math.floor(window.innerWidth / unit) * unit) / 2;

var environment = new Environment({
    unit: unit
});

var player = new Player({
    environment: environment,
    position : new Point({
        x : 400 + marginHorizontal - unit / 2,
        y : 200 + marginVertical - unit / 2
    }),
    points : 0,
    lives : 0,
    unit : unit,
    background : background
});

var ghost = new Ghost({
    environment: environment,
    position : new Point({
        x : 900 + marginHorizontal - unit / 2,
        y : 400 + marginVertical - unit / 2
    }),
    target : player,
    unit : unit,
    background : background
});

var game = new Game({
    environment : environment,
    player : player,
    ghost : ghost,

    backgroundCanvasEnvironment : new CanvasEnvironment({
        background :'rgb(0,0,0)',
        alpha : false
    }),

    foodCanvasEnvironment : new CanvasEnvironment({
        background :'rgba(0,0,0,0)',
        alpha : true
    }),

    changingCanvasEnvironment : new CanvasEnvironment({
        background :'rgba(0,0,0,0)',
        alpha : true
    })

});

game.start();




// game.backgroundCanvasEnvironment.context.beginPath();
// game.backgroundCanvasEnvironment.context.strokeStyle = '#0000ff';
//
// for(var i = 0; i < 600; i += unit) {
//     game.backgroundCanvasEnvironment.context.moveTo(0, marginVertical + i);
//     game.backgroundCanvasEnvironment.context.lineTo(window.innerWidth, marginVertical + i);
//     game.backgroundCanvasEnvironment.context.stroke();
// }

//game.backgroundCanvasEnvironment.context.closePath();
