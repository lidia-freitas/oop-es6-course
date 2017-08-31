/**
 * Created by Lidia Freitas on 29/08/2017.
 */
import {Vehicle} from './Vehicle.js';

export class Car extends Vehicle{
    constructor(license, model, latLong){
        super(license, model, latLong);
        this.miles = null;
        this.make = null;
    }
}