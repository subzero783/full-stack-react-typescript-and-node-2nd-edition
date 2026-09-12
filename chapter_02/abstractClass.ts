

namespace AbstractNamespace {

    abstract class Vehicle {
        protected wheelCount: number;
        constructor(wheelCount: number) {
            this.wheelCount = wheelCount;
        }

        abstract updateWheelCount(newWheelCount: number): void;
        showNumberOfWheels() {
            console.log(`wheels: ${this.wheelCount}`);
        }
    }

    // the rest of our existing code
    class Motorcycle extends Vehicle {
        constructor() {
            super(2);
        }

        updateWheelCount(newWheelCount: number) {
            this.wheelCount = newWheelCount;
            console.log(`Motorcycle has ${this.wheelCount}`);
        }

    }

    class Automobile extends Vehicle {
        constructor() {
            super(4);
        }

        updateWheelCount(newWheelCount: number) {
            this.wheelCount = newWheelCount;
            console.log(`Automobile has ${this.wheelCount}`);
        }

        showNumberOfWheels() {
            console.log(`Automobile wheels: ${this.wheelCount}`);
        }
    }

    const motorCycle = new Motorcycle();
    motorCycle.updateWheelCount(1);
    const autoMobile = new Automobile();
    autoMobile.updateWheelCount(3);
    autoMobile.showNumberOfWheels();

}

