/**
 * Creates the player of the game
 * who keeps track of their points and lives and moves according to the puched
 * arrow keys when possible
 *
 * @param  {Object} constructorObject with the following properties:
 * -----------------------
 * @param  {Object} points collected points
 * @param  {Object} lives 
 * -----------------------
**/

'use strict';

import MovingCharacter from './MovingCharacter.js';

export default class Player extends MovingCharacter {
    constructor(constructorObject) {
        super(constructorObject);
        this.points = constructorObject.points;
        this.lives = constructorObject.lives;
        this.listenToArrowKeys();
        this.pointDisplay = this.initPointDisplay();
    }

    action() {
        this.move();
        this.eat();
    }

    listenToArrowKeys() {
        window.addEventListener('keydown', (e) => {
            switch (e.which) {
                case 38:
                    this.intendedDirection = 'up';
                    break;
                case 40:
                    this.intendedDirection = 'down';
                    break;
                case 37:
                    this.intendedDirection = 'left';
                    break;
                case 39:
                    this.intendedDirection = 'right';
                    break;
                default:
                    break;
            }

        })
    }

    eat() {

        var isThereFood = this.environment.food.find((element) => {
            return element.x === this.position.x && element.y === this.position.y;
        });

        if(isThereFood) {
            this.points += 10;
            this.updatePoints();

            var index = this.environment.food.indexOf(isThereFood);

            //remove food from canvas
            this.environment.food[index].erease();

            //remove food from food list
            this.environment.food.splice(index, 1);

            if(this.environment.food.length === 0) {
                var winElement = document.createElement('p');
                document.querySelector('body').appendChild(winElement);
                winElement.style.position = 'fixed';
                winElement.style.zIndex = 33;
                winElement.style.color = 'white';
                winElement.style.fontSize = 111;
                winElement.innerHTML = 'CONGRATS, YOU WIN'
            }


        }
    }

    initPointDisplay() {
        var pointDisplayElement = document.createElement('p');
        document.querySelector('body').appendChild(pointDisplayElement);
        pointDisplayElement.style.position = 'fixed';
        pointDisplayElement.style.zIndex = 33;
        pointDisplayElement.style.color = 'white';

        return pointDisplayElement;
    }

    updatePoints() {
        this.pointDisplay.innerHTML = 'poins: ' + this.points;
    }

}
