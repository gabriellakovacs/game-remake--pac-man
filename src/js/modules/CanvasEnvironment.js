/**
 * Creates a canvas environment with context
 * resizes the canvas to cover the window
 *
 * @param  {Object} constructorObject with the following properties:
 * ------------------------
 * @param  {Object} background hexadecimalcolor code, default: '#000000'
 * @param  {Boolean} alpha does any element on the canvas have transparency
 * ------------------------
 *
**/

'use strict';

export default class CanvasEnvironment {

    constructor(constructorObject) {
        this.canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(this.canvas);
        this.context = this.canvas.getContext('2d', {
          alpha: constructorObject.alpha
        });
        this.background = constructorObject.background;
        this.isDrawing = false;
        this.animatableObjectList = [];
        window.addEventListener('resize', () => { this.handleResize(); });
    }

    setup() {
        this.resize(window.innerWidth, window.innerHeight);
        this.clear();
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    handleResize() {
        this.resize(window.innerWidth, window.innerHeight);
        this.clear();
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.closePath();
    }

}
