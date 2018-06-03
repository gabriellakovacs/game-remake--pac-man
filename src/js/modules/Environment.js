/**
 * Creates the environment of the game
 * autogenerates the outside edges and the inside drawWalls
 * places all the food and doors
 *
 * @param  {Object} constructorObject with the following properties:
 * @param  {Number} unit the length of one step of the Player
 *
**/

'use strict';

import Point from './Point.js';
import Line from './Line.js';

export default class Environment {
    constructor(constructorObject) {
        this.edges = {};
        this.walls = { horizontal : [], vertical : [] };
        this.doors = [];
        this.food = [];
        this.magicFood = [];
        this.unit = constructorObject.unit;
        this.init();
    }

    init() {
        this.generateEdges();
        this.generateWalls();
        this.fillWithFood();
    }

    generateEdges() {
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;

        var marginVertical = (windowHeight - Math.floor(windowHeight / this.unit) * this.unit) / 2;
        var marginHorizontal = (windowWidth - Math.floor(windowWidth / this.unit) * this.unit) / 2;

        var maxHeight = (windowHeight - marginVertical * 2) / this.unit;
        var maxWidth =  (windowWidth - marginHorizontal * 2) / this.unit;

        var paddingVertical = Math.round(Math.random() * maxHeight * 0.25 + maxHeight * 0.1) * this.unit;
        var paddingHorizontal = Math.round(Math.random() * maxWidth * 0.25 + maxWidth * 0.1) * this.unit;

        var top = paddingVertical + marginVertical;
        var bottom = windowHeight - top;
        var left =  paddingHorizontal + marginHorizontal;
        var right = windowWidth - left;


        this.edges.up = new Line({
            start : new Point({
                x : left,
                y : top
            }),
            end : new Point({
                x : right,
                y : top
            })
        });
        this.edges.down = new Line({
            start : new Point({
                x : left,
                y : bottom
            }),
            end : new Point({
                x : right,
                y : bottom
            })
        });
        this.edges.left = new Line({
            start : new Point({
                x : left,
                y : top
            }),
            end : new Point({
                x : left,
                y : bottom
            })
        });
        this.edges.right = new Line({
            start : new Point({
                x : right,
                y : top
            }),
            end : new Point({
                x : right,
                y : bottom
            })
        });

    }

    generateWalls() {
        this.walls.horizontal.push(
            new Line({
                start: new Point({
                    x : this.edges.up.start.x + 3 * this.unit,
                    y : this.edges.up.start.y + 5 * this.unit
                }),
                end: new Point({
                    x : this.edges.up.start.x + 8 * this.unit,
                    y : this.edges.up.start.y + 5 * this.unit
                })
            }
        ));

        // this.walls.horizontal.push(
        //     new Line({
        //         start: new Point({
        //             x : this.edges.up.start.x + 5 * this.unit,
        //             y : this.edges.up.start.y + 9 * this.unit
        //         }),
        //         end: new Point({
        //             x : this.edges.up.start.x + 11 * this.unit,
        //             y : this.edges.up.start.y + 9 * this.unit
        //         })
        //     }
        // ));


        this.walls.vertical.push(
            new Line({
                start: new Point({
                    x : this.edges.up.start.x + 5 * this.unit,
                    y : this.edges.up.start.y + 7 * this.unit
                }),
                end: new Point({
                    x : this.edges.up.start.x + 5 * this.unit,
                    y : this.edges.up.start.y + 9 * this.unit
                })
            }
        ));


    }

    drawWalls(canvas) {
        var horizontalWallListLength = this.walls.horizontal.length;
        for(var i = 0; i < horizontalWallListLength; i++) {
            this.walls.horizontal[i].draw(canvas);
        }

        var verticalWallListLength = this.walls.vertical.length;
        for(var i = 0; i < verticalWallListLength; i++) {
            this.walls.vertical[i].draw(canvas);
        }
    }

    fillWithFood() {
        for(var i = this.unit / 2 + this.edges.up.start.x; i < this.edges.up.end.x; i += this.unit) {
            for(var j = this.unit / 2 + this.edges.left.start.y; j < this.edges.left.end.y; j += this.unit) {
                this.food.push(new Point({
                    x : i,
                    y : j,
                    radius : 2,
                    color : 'yellow'
                }));

            }
        }
    }

    drawFood(canvas) {
        for(var i = 0; i < this.food.length; i++) {
            this.food[i].draw(canvas);
        }
    }


    draw(canvas) {

        canvas.context.beginPath();
        canvas.context.strokeStyle = '#ff0000';
        canvas.context.moveTo(this.edges.up.start.x, this.edges.up.start.y);
        canvas.context.lineTo(this.edges.up.end.x, this.edges.up.end.y);
        canvas.context.lineTo(this.edges.down.end.x, this.edges.down.end.y);
        canvas.context.lineTo(this.edges.down.start.x, this.edges.down.start.y);
        canvas.context.closePath();
        canvas.context.stroke();

        this.drawWalls(canvas);
        this.drawFood(canvas);
    }
}
