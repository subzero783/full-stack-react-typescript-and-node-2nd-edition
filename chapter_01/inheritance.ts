class Item {
    id: string;
    description: string;
    price: number;

    getId(): string {
        return this.id;
    }
}

class Bicycle extends Item {
    wheelCount: number;

    getWheelCount(): number {
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