namespace InterfaceNamespace {

    interface Thing {
        name: string;
        getFullName: () => string;
    }

    interface Vehicle extends Thing {

        wheelCount: number;
        updateWheelCount: (newWheelCount: number) => void;
        showNumberOfWheels: () => void;
    }

    // more code coming here
    class Motorcycle implements Vehicle {
        name: string;
        wheelCount: number = 0;
        constructor(name: string) {
            // no super for interfaces
            this.name = name;
        }
        updateWheelCount(newWheelCount: number) {
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
}
