/**
 * Created by Lidia Freitas on 29/08/2017.
 */

class Drone {
    constructor(id, name){
        this._id = id;
        this.name = name;
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    fly(){
        console.log(`Drone ${this.id} is flying`)
    }
}

let drone =  new Drone(1, 'teste');
drone.fly();

drone.id = 123;

drone.fly();
