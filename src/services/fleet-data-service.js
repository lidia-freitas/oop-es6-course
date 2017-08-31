/**
 * Created by Lidia Freitas on 30/08/2017.
 */
import {Car} from '../classes/Car.js';
import {Drone} from '../classes/Drone.js'
import {DataError} from  '../services/data-error.js';

export class FleetDataService {
    constructor() {
        this.cars = [];
        this.drones = [];
        this.errors = [];
    }

    getCarByLicense(license){
        return this.cars.find(function (car) {
            return car.license === license;
        });
    }

    getCarsSortedByLicence(){
        return this.cars.sort(function (car1, car2) {
            if(car1.license < car2.license)
                return -1;
            if(car1.license > car2.license)
                return 1;
            return 0;
        });
    }

    filterCarsByMake(filter){
        return this.cars.filter(car => car.make.indexOf(filter) >= 0);
    }

    loadData(fleet) {
        for (let data of fleet) {
            switch (data.type) {
                case 'car':
                    if (this.validateCarData(data)) {
                        let car = this.loadCar(data);
                        if(car){
                            this.cars.push(car);
                        }
                        this.cars.push(data);
                    } else {
                        let e = new DataError('Invalid car data', data);
                        this.errors.push(e);
                    }
                    break;
                case 'drone' :
                    if (this.validateDroneData(data)) {
                        let drone = this.loadDrone(data);
                        if(drone){
                            this.drones.push(data);
                        }
                    } else {
                        let e = new DataError('Invalid drone data', data);
                        this.errors.push(e);
                    }
                    break;
                default:
                    let e = new DataError('Invalid Vehicle type', data);
                    this.errors.push(e);
                    break;
            }
        }
    }

    loadCar(car) {
        try {
            let c = new Car(car.license, car.model, car.latLong);
            c.make = car.make;
            c.miles = car.miles;
            return c;
        }
        catch (e) {
            this.errors.push(new DataError('Error loading car', car))
        }

        return null;

    }

    loadDrone(drone) {
        try {
            let d = new Drone(drone.license, drone.model, drone.latLong);
            d.make = drone.make;
            d.miles = drone.miles;
            return d;
        }
        catch (e) {
            this.errors.push(new DataError('Error loading drone', drone))
        }
        return null;

    }

    validateCarData(car){
        let requiredProps = 'license model latLong miles make'.split(' ');
        let hasErrors = false;

        for(let field of requiredProps){
            if(!car[field]){
                this.errors.push(new DataError(`Invalid field ${field}`, car));
                hasErrors = true;
            }
        }

        if(Number.isNaN(Number.parseFloat(car.miles))){
            this.errors.push(new DataError('invalid mileage', car));
            hasErrors = true;
        }

        return !hasErrors;
    }

    validateDroneData(drone){
        let requiredProps = 'license type model airTimeHours base latLong'.split(' ');
        let hasErrors = false;

        for(let field of requiredProps){
            if(!drone[field]){
                this.errors.push(new DataError(`Invalid field ${field}`, drone));
                hasErrors = true;
            }
        }

        if(Number.isNaN(Number.parseFloat(drone.airTimeHours))){
            this.errors.push(new DataError('invalid Air time', drone));
            hasErrors = true;
        }

        return !hasErrors;
    }
}