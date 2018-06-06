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
import Point from './Point.js';

export default class Ghost extends MovingCharacter {
    constructor(constructorObject) {
        super(constructorObject);
        this.planReady = false;
        this.target = constructorObject.target;
        this.initialWait = constructorObject.initialWait || 30;
        this.plan = [];
        this.chaseMode = true;
        this.isAlive = true;
        this.makePlan();
        this.stepCounter = 0;
    }

    action() {

        if(this.planReady) {
            this.stepCounter++;
            console.log('this.stepCounter ' + this.stepCounter);
            this.adjustPlan();
            this.next();
        }
        //this.setDirection();
        //this.move();
    }

    next() {
        if(this.plan[this.stepCounter]) {
            this.position.x = this.plan[this.stepCounter].x;
            this.position.y = this.plan[this.stepCounter].y;
        }

    }

    adjustPlan() {

        if(this.target.position.x === this.plan[this.plan.length - 1].x && this.target.position.y === this.plan[this.plan.length - 1].y) {
            console.log('target did not change position');
            var a = 1;
        } else if(this.target.position.x === this.plan[this.plan.length - 2].x && this.target.position.y === this.plan[this.plan.length - 2].y) {
            console.log('target moved backwards');
            this.plan.pop();
        } else {
            console.log('target moved forwards');
            this.plan.push(new Point({
                x : this.target.position.x,
                y : this.target.position.y
            }));
        }

        console.log('this.plan');
        console.dir(this.plan);
    }

    setDirection() {
        var distanceX = this.target.prevPosition.x - this.position.x;
        var distanceY = this.target.prevPosition.y - this.position.y;

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

    makePlan() {

        this.routeList = [];
        var route = { position : new Point({x: 0, y: 0}), stepList : [], posHistory : [ new Point({x: 0, y: 0})] };
        route.position.x = this.position.x;
        route.position.y = this.position.y;

        route.posHistory[0].x = this.position.x;
        route.posHistory[0].y = this.position.y;

        this.prevRouteList = [];
        this.prevRouteList.push(route);




        while(!this.planReady) {

            this.prevRouteListLength = this.prevRouteList.length;

            for(var i = 0; i < this.prevRouteListLength; i++) {

                this.step(this.prevRouteList[i]);
            }

            this.eliminateDuplicates(this.routeList);

            this.prevRouteList = this.routeList.slice(0, this.routeList.length);
            this.routeList = [];

        }



    }

    step(route) {

        var directionsList = ['up','down', 'left','right'];
        var oppositDirectionDictionary = {
            up : 'down',
            down :'up',
            left : 'right',
            right : 'left'
        }


        var prevDirection = route.stepList[route.stepList.length-1];
        if(prevDirection) {
            var prevDirectionOpposite = oppositDirectionDictionary[prevDirection];
            var prevDirectionOppositeIndex = directionsList.indexOf(prevDirectionOpposite);
            directionsList.splice(prevDirectionOppositeIndex, 1);
        }

        var directionsListLength = directionsList.length;

        for(var i = 0; i < directionsListLength; i++) {
                var routeAlternative = { position : new Point(0, 0), stepList : [], posHistory : []  };


                this.position.x = route.position.x;
                this.position.y = route.position.y;

            if(this.isThisWayFree(directionsList[i])) {
                this.direction = directionsList[i];
                this.intendedDirection = directionsList[i];

                this.move();


                routeAlternative.stepList = route.stepList.slice(0, route.stepList.length);
                routeAlternative.stepList.push(directionsList[i]);

                var x = this.position.x;
                var y = this.position.y;
                var p = new Point({
                    x : x,
                    y : y
                });



                routeAlternative.posHistory = route.posHistory.slice(0, route.posHistory.length);
                routeAlternative.posHistory.push(p);

                routeAlternative.position.x = this.position.x;
                routeAlternative.position.y = this.position.y;

                if(this.position.x === this.target.position.x && this.position.y === this.target.position.y) {
                    console.log('yyyyyyyyyyyyyaaaaaaaaaaaaaaayyyyyyyyyyyy');
                    this.planReady = true;
                    console.log('this.planReady inside sttep');
                    console.log(this.planReady);
                    this.plan = routeAlternative.posHistory;
                    return;
                }


                this.routeList.push(routeAlternative);
            }
        }

    }

    eliminateDuplicates(routeList) {
        var routeListLength = routeList.length;
        for(var i = 0; i < routeListLength; i++) {
            for(var j = 0; j < routeListLength; j++) {
                if(i !== j && i < routeListLength) {
                    if(routeList[i].position.x === routeList[j].position.x &&
                       routeList[i].position.y === routeList[j].position.y) {

                        routeList.splice(j, 1);
                        routeListLength--;
                    }
                }

            }
        }
    }



}
