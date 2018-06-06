/**
 * Creates a moving character
 * who avoids the walls and stays within the edges of the environment
 *
 * @param  {Object} constructorObject with the following properties:
 * -----------------------
 * @param  {Object} environment Environment object
 * @param  {Object} position Point object
 * @param  {Number} unit one step of the character
 * @param  {String} background color
 * -----------------------
 *
**/

'use strict';

import Point from './Point.js';

export default class MovingCharacter {
    constructor(constructorObject) {
        this.environment = constructorObject.environment;
        this.position = constructorObject.position;
        this.prevPosition = new Point({x : 0, y: 0});
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
        this.unit = constructorObject.unit;
        this.background = constructorObject.background;
        this.direction = false;
        this.intendedDirection = false;
    }

    move() {

        if(this.intendedDirection !== this.direction) {
            if(this.isThisWayFree(this.intendedDirection)) {
                this.direction = this .intendedDirection;
            }
        }

        switch (this.direction) {
            case 'up':
                this.moveUp();
                break;
            case 'down':
                this.moveDown();
                break;
            case 'left':
                this.moveLeft();
                break;
            case 'right':
                this.moveRight();
                break;
            default:
                break;
        }

        this.prevPosition.y = this.position.y;
        this.prevPosition.x = this.position.x;
    }

    isObstacleMoving(direction, obstacle) {
        switch (direction) {
            case 'up':
                return(
                    this.position.y - this.unit * 0.5 === obstacle.start.y
                    && this.position.x > obstacle.start.x
                    && this.position.x < obstacle.end.x
                );
                break;
            case 'down':
                return(
                    this.position.y + this.unit * 0.5 === obstacle.start.y
                    && this.position.x > obstacle.start.x
                    && this.position.x < obstacle.end.x
                );
                break;
            case 'left':
                return(
                    this.position.x - this.unit * 0.5 === obstacle.start.x
                    && this.position.y > obstacle.start.y
                    && this.position.y < obstacle.end.y
                );
                break;
            case 'right':
                return(
                    this.position.x + this.unit * 0.5 === obstacle.start.x
                    && this.position.y > obstacle.start.y
                    && this.position.y < obstacle.end.y
                );
                break;
            default:

        }

    }

    isThisWayFree(direction) {
        var wallList;
        var wallListLength;
        var pathClear = true;

        if(direction === 'up' || direction === 'down') {
            wallList = this.environment.walls.horizontal;

        } else if (direction === 'left' || direction === 'right') {
            wallList = this.environment.walls.vertical;
        }

        wallListLength = wallList.length;

        if(!this.isObstacleMoving(direction, this.environment.edges[direction])) {
            for(var i = 0; i < wallListLength; i++) {
                if(this.isObstacleMoving(direction, wallList[i])) {
                    pathClear = false;
                    break;
                }
            }
        } else {
            pathClear = false;
        }

        return pathClear;
    }

    moveUp() {
        if(this.isThisWayFree('up')) {
            this.position.y -= this.unit;
        }
    }

    moveDown() {
        if(this.isThisWayFree('down')) {
            this.position.y += this.unit;
        }
    }

    moveLeft() {
        if(this.isThisWayFree('left')) {
            this.position.x -= this.unit;
        }
    }

    moveRight() {
        if(this.isThisWayFree('right')) {
            this.position.x += this.unit;
        }
    }

    draw(canvas,color) {

        canvas.context.beginPath();
        canvas.context.fillStyle = color;
        canvas.context.arc(this.position.x, this.position.y, this.unit/2, 0, 7);
        canvas.context.closePath();
        canvas.context.fill();
    }
}
