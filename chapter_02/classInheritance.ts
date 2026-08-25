class Vehicle {
    protected wheelCount: number;
    constructor(wheelCount: number) {
        this.wheelCount = wheelCount;
    }
    showNumberOfWheels() {
        console.log(`wheels: ${this.wheelCount}`);
    }
}
class Motorcycle extends Vehicle {
    constructor() {
        super(2);
    }
    updateWheelCount(newWheelCount: number) {
        this.wheelCount = newWheelCount;
    }
}
class Automobile extends Vehicle {
    constructor() {
        super(4);
    }
}
const motorCycle = new Motorcycle();
motorCycle.updateWheelCount(3);
motorCycle.showNumberOfWheels();
const autoMobile = new Automobile();
autoMobile.showNumberOfWheels();