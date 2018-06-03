/**
 * Creates a line
 * with a start and an end point
 *
 * @param  {Object} constructorObject with the following properties:
 * ---------------------------
 * @param  {Object} start a Point object
 * @param  {Object} end a Point object
 *
**/

'use strict';

export default class Line {
    constructor(constructorObject) {
        this.start = constructorObject.start;
        this.end = constructorObject.end;
    }

    draw(canvas) {
        canvas.context.beginPath();
        canvas.context.strokeStyle = '#ffffff';
        canvas.context.moveTo(this.start.x, this.start.y);
        canvas.context.lineTo(this.end.x, this.end.y);
        canvas.context.stroke();
    }
}
