'use strict'

class Vehicle {
    constructor(dimensions, brand, model, manufactureDate) {
        this.dimensions = dimensions;
        this.brand = brand;
        this.model = model;
        this.manufactureDate = manufactureDate;
    };
    getMaxSize() {
        return Math.max(...Object.values(this.dimensions));
    };
    getAge() {
        return Math.round( (new Date() - this.manufactureDate) / (24 * 60 * 60 * 1000) );
    };
};

class PassengerTransport extends Vehicle {
    constructor(dimensions, brand, model, manufactureDate, passengerLimit, passengerCount) {
        super(dimensions, brand, model, manufactureDate);
        this.passengerLimit = passengerLimit;
        this.passengerCount = passengerCount;
    };
    addPassenger() {
        console.log('*************************');
        console.log(`${this.brand} ${this.model} - manufactured ${super.getAge()} days ago`);
        console.log(`passengerLimit - ${this.passengerLimit}, passengerCount - ${this.passengerCount}`);

        return this.passengerLimit - this.passengerCount > 0 ? !!this.passengerCount++ : false;
    }; 
};

class FreightTransport extends Vehicle {
    constructor(dimensions, brand, model, manufactureDate, capacity) {
        super(dimensions, brand, model, manufactureDate);
        this.capacity = capacity;
    }
    
    // Решил немного разнообразить метод замыканием. Так показалось немного интереснее будет)
    checkLoadingPossibility() {
        let loaded = 0;
        const self = this;

        return function(weight) {
            if(typeof loaded !== 'number') {
                return 'Full loading!';
            };

            loaded += weight;
            
            if(loaded > self.capacity) {
                loaded = 'Full loading';
            };

            console.log('*************************');
            console.log('weight :>> ', weight, '| loaded :>> ', loaded, '| capacity :>> ', self.capacity);

            return loaded < self.capacity;
        };
    };     
};


// testing...
console.group('Testing class Vehicle')
    const train = new Vehicle({a: 1200, b: 3, c: 5}, 'Druzhba', 'Meteor', new Date(1999, 11, 2));

    console.log('train.getMaxSize() :>> ', train.getMaxSize());
    console.log('train.getAge() :>> ', train.getAge());
console.groupEnd();

console.group('Testing class PassengerTransport');
    const sprinter = new PassengerTransport({a: 5, b: 3, c: 2.2}, 'Mercedes', 'Sprinter', new Date(2015, 3, 1), 18, 17);

    console.log('sprinter.addPassenger() :>> ', sprinter.addPassenger());
    console.log('sprinter.addPassenger() :>> ', sprinter.addPassenger());
console.groupEnd();

console.group('Testing class FreightTransport');
    const kamaz = new FreightTransport({a: 50, b: 4, c: 3}, 'Kamaz', 'Ultra', new Date(1974, 11, 2), 2000);
    const kamazLoading = kamaz.checkLoadingPossibility();

    console.log('kamazLoading(300) :>> ', kamazLoading(300));
    console.log('kamazLoading(200) :>> ', kamazLoading(200));
    console.log('kamazLoading(1100) :>> ', kamazLoading(1100));
    console.log('kamazLoading(500) :>> ', kamazLoading(500));
    console.log('kamazLoading(100) :>> ', kamazLoading(100));
console.groupEnd();







