"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterfaceNamespace;
(function (InterfaceNamespace) {
    // more code coming here
    class Motorcycle {
        name;
        wheelCount = 0;
        constructor(name) {
            // no super for interfaces
            this.name = name;
        }
        updateWheelCount(newWheelCount) {
            this.wheelCount = newWheelCount;
            console.log(`Motorcycle has ${this.wheelCount}`);
        }
        showNumberOfWheels() {
            console.log(`Motorcycle has ${this.wheelCount} wheels`);
        }
        getFullName() {
            return "MC-" + this.name;
        }
    }
    const moto = new Motorcycle("beginner-cycle");
    console.log(moto.getFullName());
})(InterfaceNamespace || (InterfaceNamespace = {}));
//# sourceMappingURL=interfaceInheritance.js.map