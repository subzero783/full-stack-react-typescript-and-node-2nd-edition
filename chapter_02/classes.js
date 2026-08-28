"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    msg;
    constructor(msg) {
        this.msg = msg;
    }
    speak() {
        this.msg = "speak " + this.msg;
        console.log(this.msg);
    }
}
const tom = new Person("hello");
// tom.msg = "hello";
tom.speak();
//# sourceMappingURL=classes.js.map