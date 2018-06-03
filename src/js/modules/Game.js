/**
 * Game
 * all objects that need to be animated should be passed in the animatableObjectList.
 * They should all have a method called animate.
 *
 * @param  {Object} constructorObject with the following properties:
 * ----------------------------
 * @param  {Object} environment the length of one step of the Player
 * @param  {Object} player the character piloted by the user
 * @param  {Object} ghost the non-playable characters
 * @param  {Object} backgroundCanvasEnvironment where the environment is drawn
 * @param  {Object} changingCanvasEnvironment where the moving players are drawn
 * ----------------------------
 *
**/

'use strict';

export default class Game {

    constructor(constructorObject) {
        this.isPlaying = false;
        this.environment = constructorObject.environment;
        this.player = constructorObject.player;
        this.ghost = constructorObject.ghost;
        this.backgroundCanvasEnvironment = constructorObject.backgroundCanvasEnvironment;
        this.changingCanvasEnvironment = constructorObject.changingCanvasEnvironment;
        this.step = 0;
    }

    start() {
        this.isPlaying = true;
        this.draw();

        this.changingCanvasEnvironment.setup();
        this.backgroundCanvasEnvironment.setup();
        this.environment.draw(this.backgroundCanvasEnvironment);
    }

    fail() {
        this.isPlaying = false;
    }

    win() {
        this.isPlaying = false;
    }

    draw() {

        if(this.isPlaying) {
            window.requestAnimationFrame(() => {
                this.draw();
            });

            if(this.step % 6 === 0) {
                this.changingCanvasEnvironment.clear();
                this.player.action();
                this.player.draw(this.changingCanvasEnvironment, 'red');

                this.ghost.action();
                this.ghost.draw(this.changingCanvasEnvironment, 'blue');
            }



            this.step++;

        }
    }

}
