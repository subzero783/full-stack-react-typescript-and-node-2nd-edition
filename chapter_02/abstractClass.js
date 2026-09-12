"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractNamespace;
(function (AbstractNamespace) {
    class Vehicle {
        wheelCount;
        constructor(wheelCount) {
            this.wheelCount = wheelCount;
        }
        showNumberOfWheels() {
            console.log(`wheels: ${this.wheelCount}`);
        }
    }
    // the rest of our existing code
    class Motorcycle extends Vehicle {
        constructor() {
            super(2);
        }
        updateWheelCount(newWheelCount) {
            this.wheelCount = newWheelCount;
            console.log(`Motorcycle has ${this.wheelCount}`);
        }
    }
    class Automobile extends Vehicle {
        constructor() {
            super(4);
        }
        updateWheelCount(newWheelCount) {
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
})(AbstractNamespace || (AbstractNamespace = {}));
//# sourceMappingURL=abstractClass.js.map