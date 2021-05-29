'use strict'

class Transport {
    constructor (name, model, year, weight, speed) {
        this.name = name;
        this.model = model;
        this.year = year;
        this.weight = weight;
        this.speed = speed;
    }
    showMiddleSpeed() {
        console.log(`Middle speed of ${this.name} ${this.model} is ${this.speed} km/h`);
    }
    roadCounter(days = 1, seasonName = 'winter') {
        let counter = 0;
        let season = seasonName;
        const self = this;
        
        return function() {
            for(let i = 0; i < days; i++) {
                counter += Math.round( Math.random() * 500);
            };
            
            console.log(`${self.name} ${self.model} drove ${counter} kilometres in ${seasonName}. ${days} days in the race`);
            return [counter, season, days];
        };
    }
    showInfo() {
        console.log(`${this.name} ${this.model}, ${this.year} year, ${this.weight} kg}`);
    }
};

class FreightTransport extends Transport {
    constructor(name, model, year, weight, speed) {
        super(name, model, year, weight, speed);
    }
    showMaxSpeed() {
        super.showMiddleSpeed();
        console.log(`Max speed of ${this.name} ${this.model} is ${Math.floor( this.speed * 1.7 )} km/h`);
    };
    showInfo() {
        super.showInfo();
        console.log('Freight Transport!');
    }
};

class PrivateTransport extends Transport {
    constructor(name, model, year, weight, speed, country) {
        super(name, model, year, weight, speed);    
        this.country = country;
    }
    #price = 10000;

    get price () {
        return this.#price;
    }
    set price (val) {
        if (val <= 0) {
            throw new RangeError('Price is too small!');
        };
        if (typeof val !== 'number') {
            throw new TypeError('Price is not a number');
        };

        this.#price = val;
    }
    showInfo() {
        console.log(`${this.name} ${this.model} costs ${this.price}$. Made in ${this.country}`);
    }
    showMaxSpeed () {
        console.log(`Max speed of ${this.name} ${this.model} is ${Math.floor( this.speed * 1.7 )} km/h`);
    };
}


const man = new FreightTransport('MAN', "C55", 2014, 5000, 90);
man.showMaxSpeed();

// debugger;
const manCounter = man.roadCounter(3, 'spring');

manCounter();

const lamborghini = new PrivateTransport('Lamborghini', 'Aventador', 2010, 1500, 180, 'Italy');
lamborghini.price = 900000;
lamborghini.showInfo();

console.log('lamborghini :>> ', lamborghini);
const lamborghiniCounter = lamborghini.roadCounter(5, 'summer');
lamborghiniCounter();



//  closure
const add = addNum(5);
const result = add(10); // => 15
console.log('result :>> ', result);

function addNum(n) {
    
    return function(m) {
        if (typeof n !== 'number' || typeof m !== 'number') {
            throw new TypeError(`This value is not a number`);
        };
        if (!Number.isFinite(n) || !Number.isFinite(m)) {
            throw new RangeError(`This value isn't correct. Enter another...`);
        };

        return n + m;
    };
};






