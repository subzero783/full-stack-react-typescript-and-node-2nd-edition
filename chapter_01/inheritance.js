"use strict";
class Item {
    id;
    description;
    price;
    getId() {
        return this.id;
    }
}
class Bicycle extends Item {
    wheelCount;
    getWheelCount() {
        return this.wheelCount;
    }
}
const bike = new Bicycle();
bike.id = "123";
bike.description = "Mountain Bike";
bike.price = 299.99;
bike.wheelCount = 2;
console.log("id", bike.getId());
console.log("wheel count", bike.getWheelCount());
