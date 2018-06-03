/**
 * Creates the environment ofthe game
 * with x, y cordinates.
 *
 * @param  {Number} x horizontal coordinate of the point
 * @param  {Number} y vertical coordinate of the point
**/

'use strict';

import Point from './Point.js';
import Line from './Line.js';

export default class Food {
    constructor(constructorObject) {
        this.environment = constructorObject.environment;
        this.init();
    }

    init() {
        for(var i = this.unit / 2 + this.edges.left; i < this.edges.right; i += this.unit) {
            for(var j = this.unit / 2 + this.edges.top; j < this.edges.bottom; j += this.unit) {
                this.food.push(new Point({
                    x : i,
                    y : j,
                    radius : 2,
                    color : 'yellow'
                }));

            }
        }
    }


    draw(canvas) {
        for(var i = 0; i < this.food.length; i++) {
            this.food[i].draw(canvas);
        }
    }
}
