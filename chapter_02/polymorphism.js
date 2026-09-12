"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Wolf {
    name = "";
    runMaxMiles(hours) {
        return hours * 45;
    }
}
class Cheetah {
    name = "";
    runMaxMiles(hours) {
        return hours * 75;
    }
}
const hours = 0.5;
function pickTheBestAnimalToRun(hours) {
    let animal;
    if (hours >= 0.5) {
        animal = new Wolf();
        animal.name = "wolfie";
    }
    else {
        animal = new Cheetah();
        animal.name = "cheetos";
    }
    if (animal instanceof Wolf) {
        console.log("This is a wolf");
    }
    if (animal instanceof Cheetah) {
        console.log("This is a cheetah");
    }
    return animal.runMaxMiles(hours);
}
pickTheBestAnimalToRun(hours);
//# sourceMappingURL=polymorphism.js.map