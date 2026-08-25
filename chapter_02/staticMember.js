"use strict";
// class ClassA {
//     static typeName: string;
Object.defineProperty(exports, "__esModule", { value: true });
//     constructor() {
//     }
//     static getFullName() {
//         return "ClassA " + ClassA.typeName;
//     }
// }
// const a = new ClassA();
// console.log(ClassA.typeName);
class Runner {
    static lastRunTypeName;
    typeName;
    constructor(typeName) {
        this.typeName = typeName;
    }
    run() {
        Runner.lastRunTypeName = this.typeName;
    }
}
const a = new Runner("a");
const b = new Runner("b");
b.run();
a.run();
console.log(Runner.lastRunTypeName);
//# sourceMappingURL=staticMember.js.map