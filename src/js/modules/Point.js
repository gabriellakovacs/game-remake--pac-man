/**
 * Creates a point in the Cartesian coordinate system
 * with x, y cordinates.
 *
 * @param  {Object} constructorObject with the following properties:
 * ---------------------------
 * @param  {Number} x horizontal coordinate of the point
 * @param  {Number} y vertical coordinate of the point
 * ---------------------------
**/

'use strict';

export default class Point {
    constructor(constructorObject) {
        this.x = constructorObject.x;
        this.y = constructorObject.y;
        this.radius = constructorObject.radius || 5;
        this.color = constructorObject.color || '#ffffff';
    }

    draw(canvas) {
        this.canvas = canvas;
        canvas.context.beginPath();
        canvas.context.fillStyle = this.color;
        canvas.context.arc(this.x, this.y, this.radius, 0, 7);
        canvas.context.closePath();
        canvas.context.fill();
    }

    erease() {
        if(this.canvas) {
                this.canvas.context.clearRect(this.x - this.radius * 2, this.y - this.radius * 2, this.radius * 4, this.radius * 4);
        }

    }
}
