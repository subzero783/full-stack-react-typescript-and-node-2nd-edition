"use strict";
class Person {
    msg;
    // constructor(private readonly msg: string) { }
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
