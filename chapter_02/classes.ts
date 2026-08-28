class Person {
    private msg: string;
    constructor(msg: string) {
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