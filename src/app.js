/**
 * Created by Lidia Freitas on 29/08/2017.
 */

import {Car} from './classes/Car.js';
import {Drone} from './classes/Drone.js'
import {fleet} from './fleet-data.js'
import {FleetDataService} from './services/fleet-data-service.js'


let dataService = new FleetDataService();

dataService.loadData(fleet);

// let car = dataService.getCarByLicense('AT9900');
//
// let cars = dataService.getCarsSortedByLicence();

let cars = dataService.filterCarsByMake('e');

for(let car of cars){
    console.log(car.license);
}
