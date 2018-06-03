/**
 * Creates the non-playable characters of the game
 *
 *
 * @param  {Object} constructorObject with the following properties:
 * -----------------------
 * @param  {Object} target the playable characyer of the game
 * -----------------------
**/

'use strict';

import MovingCharacter from './MovingCharacter.js';

export default class Ghost extends MovingCharacter {
    constructor(constructorObject) {
        super(constructorObject);
        this.target = constructorObject.target;
        this.chaseMode = true;
        this.isAlive = true;
    }

    action() {
        this.setDirection();
        this.move();

    }

    setDirection() {
        var distanceX = this.target.prevPosition.x - this.position.x;
        var distanceY = this.target.prevPosition.y - this.position.y;

        // console.log('----------------------');
        // console.log('distanceX ' + distanceX);
        // console.log('distanceY ' + distanceY);

        if(Math.abs(distanceX) > Math.abs(distanceY)) {
            if(distanceX < 0) {
                this.intendedDirection = 'left';
            } else {
                this.intendedDirection = 'right';
            }
        } else {
            if(distanceY < 0) {
                this.intendedDirection = 'up';
            } else if(distanceY > 0) {
                this.intendedDirection = 'down';
            } else {
                this.direction = 'none';
                this.intendedDirection = 'none';
            }
        }
    }




}
